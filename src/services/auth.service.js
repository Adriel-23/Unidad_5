import userRepository from "../repositories/user.repository.js"
import ServerError from "../helpers/serverError.helper.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

class AuthService {
    async validateRegister(name, email, password){
        if(!name || !email || !password){
            throw new ServerError('Todos los campos son obligatorios', 400)
        }
        const existingUser = await userRepository.findUserByEmail(email)
        if(existingUser){
            throw new ServerError('El email ya está registrado', 400)
        }
        const userData = {
            name,
            email,
            password
        }
        return userData;
    }

    async validateLogin(email, password){
        if(!email || !password){
            throw new ServerError('Email y contraseña son obligatorios', 400)
        }
        
        const foundUser = await userRepository.findUserByEmail(email) 
        if (!foundUser){
<<<<<<< HEAD
            throw new ServerError('Tu email o contraseña son incorrectos', 401)
=======
            throw new ServerError('Tus credenciales son incorrectas', 401)
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
        }
        
        const isSamePassword = await bcrypt.compare(password, foundUser.password)
        if(!isSamePassword){
<<<<<<< HEAD
            throw new ServerError('Tu email o contraseña son incorrectos', 401)
        }
        if (!foundUser.email_verified){
            throw new ServerError('Tu correo electrónico no ha sido verificado', 401)
=======
            throw new ServerError('Tus credenciales son incorrectas', 401)
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
        }

        const authToken = jwt.sign(
            {
                user_id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            },
            ENVIRONMENT.JWT_SECRET_KEY
        )
        
        return authToken;
    }
}

export default new AuthService();