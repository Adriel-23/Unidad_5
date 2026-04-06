import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/serverError.helper.js";

class Usercontroller {
    async registerUser(req, res){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password){
                throw new ServerError('Todos los campos son obligatorios', 400)
            }
            
            const newUserData = {
                name,
                email, 
                password
            }
            const existingUser = await userRepository.findUserByEmail(email)
            if(existingUser){
                throw new ServerError('El email ya está registrado', 400)
            }

            const newUser = await userRepository.registerUser(newUserData)
            res.status(201).json(newUser)
        }
        catch(error){
            if(error instanceof ServerError){
                res.status(error.statusCode).send({
                    ok: false,
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                res.status(500).send({
                    ok: false,
                    status: 500,
                    message: 'Error al registrar el usuario: ' + error.message
                })
            }
        }
    }
    async loginUser(req, res){
        const { email, password } = req.body
        try{
            const foundUser = await userRepository.findUserByEmail(email)
            if(!foundUser || foundUser.password !== password){
                throw new ServerError('Tu email o contraseña son incorrectos', 401)
            }
            res.status(200).send({
                ok: true,
                status: 200,
                message: 'Inicio de sesión exitoso',
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    email: foundUser.email,
                    created_at: foundUser.createdAt
                }
            })
        }
        catch(error){
            if(error instanceof ServerError){
                res.status(error.statusCode).send({
                    ok: false,
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                res.status(500).send({
                    ok: false,
                    status: 500,
                    message: 'Error al iniciar sesión: ' + error.message
                })
            }
        }
    }
}

export default new Usercontroller();