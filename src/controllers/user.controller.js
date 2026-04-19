import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import jwt from "jsonwebtoken";
import authService from "../services/auth.service.js";
import ENVIRONMENT from "../config/environment.config.js";
import mailTransporter from "../config/mail.config.js";
import ServerError from "../helpers/serverError.helper.js";
=======
import authService from "../services/auth.service.js";
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f

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

            //Creamos token de verificación de correo electrónico que enviaremos por mail con el email del usuario de acabamos de crear.
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

            res.status(201).json(newUser)
        }
        catch(error){
            next(error);
        }
    }
    
    async loginUser(req, res, next){
        try{
            const { email, password } = req.body
            const authToken = await authService.validateLogin(email, password)
            res.status(200).send({
                ok: true,
                status: 200,
                message: 'Inicio de sesión exitoso',
                data: {
                    authToken: authToken
                }
            });
<<<<<<< HEAD
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
=======
        }
        catch(error){
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
            next(error);
        }
    }
}


export default new Usercontroller();