import ServerError from "../helpers/serverError.helper.js";
import userRepository from "../repositories/user.repository.js";

class AuthMiddleware {
    async validateUser(req, res, next){
        try{
            const user_id = req.params.user_id
            const userFound = await userRepository.findUserById(user_id)
            if(!user_id){
                throw new ServerError('No se ha proporcionado el ID de usuario', 400)
            }
            if(!userFound){
                throw new ServerError('Usuario no encontrado', 404)
            }
            req.user = userFound
            next()
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
                    message: 'Error al validar el usuario: ' + error.message
                })
            }
        }
    }
}
const authMiddleware = new AuthMiddleware()
export default authMiddleware;