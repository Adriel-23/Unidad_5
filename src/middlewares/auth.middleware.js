import ServerError from "../helpers/serverError.helper.js";
import userRepository from "../repositories/user.repository.js";

class AuthMiddleware {
    async validateUser(req, res, next){
        try{
            const user_id = req.params.user_id
            if(!user_id){
                throw new ServerError('No se ha proporcionado el ID de usuario', 400)
            }
            const userFound = await userRepository.findUserById(user_id)
            if(!userFound){
                throw new ServerError('Usuario no encontrado', 404)
            }
            req.user = userFound
            next()
        }
        catch(error){
            next(error)
        }
    }
}
const authMiddleware = new AuthMiddleware()
export default authMiddleware;