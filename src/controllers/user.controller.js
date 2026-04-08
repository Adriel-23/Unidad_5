import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

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
        }
        catch(error){
            next(error);
        }
    }
}


export default new Usercontroller();