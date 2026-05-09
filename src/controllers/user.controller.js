import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authService from "../services/auth.service.js";
import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mail.config.js";
import ServerError from "../helpers/serverError.helper.js";

class Usercontroller {
    async registerUser(req, res, next){
        try{
            const { name, email, password } = req.body
            const userData = await authService.validateRegister(name, email, password)

            const hashedPassword = await bcrypt.hash(userData.password, 12)

            const newUserData = {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            }
            const newUser = await userRepository.registerUser(newUserData)

            //Creamos token de verificación de correo electrónico
            const verificationToken = jwt.sign(
                {
                    email: newUser.email,
                },
                ENVIRONMENT.JWT_SECRET_KEY
            )

            await mailTransporter.sendMail(
                {
                    to: email,
                    from: ENVIRONMENT.MAIL_USERNAME,
                    subject: 'Verificación de correo electrónico',
                    html: `
                        <h1>Hola, ${newUser.name}</h1>
                        <p>Por favor, verifica tu correo electrónico haciendo clic en "Verificar"</p>
                        <a href="${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email?verificationToken=${verificationToken}">Verificar correo electrónico</a>
                    `
                }
            )

            res.status(201).json({
                ok: true,
                message: 'Usuario registrado. Por favor verifica tu correo electrónico.',
                data: newUser
            })
        }
        catch(error){
            next(error);
        }
    }
    
    async loginUser(req, res, next){
        try{
            const { email, password } = req.body
            const authToken = await authService.validateLogin(email, password)
            
            // Buscamos al usuario para devolver su info
            const userFound = await userRepository.findUserByEmail(email)

            res.status(200).send({
                ok: true,
                status: 200,
                message: 'Inicio de sesión exitoso',
                data: {
                    authToken: authToken,
                    user: {
                        id: userFound._id,
                        name: userFound.name,
                        email: userFound.email
                    }
                }
            });
        }
        catch(error){
            next(error);
        }
    }
    async verifyEmail(req, res, next){
        try{
            const { verificationToken } = req.query
            if(!verificationToken){
                throw new ServerError('Token de verificación no proporcionado', 400)
            }
            const payload = jwt.verify(verificationToken, ENVIRONMENT.JWT_SECRET_KEY)
            const { email } = payload
            const userFound = await userRepository.findUserByEmail(email)
            if(!userFound){
                throw new ServerError('Usuario no encontrado', 404)
            }
            await userRepository.updateById(userFound._id, { email_verified: true })
            return res.status(200).send({
                ok: true,
                status: 200,
                message: 'Correo electrónico verificado exitosamente'
            })
        }
        catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                return next(new ServerError('Token de verificación inválido', 401))
            }
            next(error);
        }
    }

    async toggleFavorite(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const { product_id } = req.params;
            const user = await userRepository.findUserById(user_id);
            
            const isFavorite = user.favorites.includes(product_id);
            if (isFavorite) {
                user.favorites = user.favorites.filter(id => id.toString() !== product_id);
            } else {
                user.favorites.push(product_id);
            }
            await user.save();
            
            res.status(200).json({
                ok: true,
                status: 200,
                message: isFavorite ? 'Removido de favoritos' : 'Añadido a favoritos',
                data: user.favorites
            });
        } catch (error) {
            next(error);
        }
    }

    async getFavorites(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const user = await userRepository.findUserById(user_id);
            await user.populate('favorites');
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Favoritos obtenidos',
                data: user.favorites
            });
        } catch (error) {
            next(error);
        }
    }

    async addToCart(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const { product_id } = req.params;
            const { quantity = 1 } = req.body;

            const user = await userRepository.findUserById(user_id);
            
            const cartItemIndex = user.cart.findIndex(item => item.product.toString() === product_id);
            if (cartItemIndex >= 0) {
                user.cart[cartItemIndex].quantity += Number(quantity);
            } else {
                user.cart.push({ product: product_id, quantity: Number(quantity) });
            }
            await user.save();

            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Añadido al carrito',
                data: user.cart
            });
        } catch (error) {
            next(error);
        }
    }

    async removeFromCart(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const { product_id } = req.params;

            const user = await userRepository.findUserById(user_id);
            user.cart = user.cart.filter(item => item.product.toString() !== product_id);
            await user.save();

            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Removido del carrito',
                data: user.cart
            });
        } catch (error) {
            next(error);
        }
    }

    async getCart(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const user = await userRepository.findUserById(user_id);
            await user.populate('cart.product');
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Carrito obtenido',
                data: user.cart
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new Usercontroller();