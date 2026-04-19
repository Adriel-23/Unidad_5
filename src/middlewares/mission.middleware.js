import ServerError from "../helpers/serverError.helper.js";
import missionRepository from "../repositories/mission.repository.js";

class MissionMiddleware {
    async validateMissionData(req, res, next){
        try{
            const {user_id} = req.params
            const { title, description } = req.body
<<<<<<< HEAD
            if(!title || !description){
                throw new ServerError('Título y descripción son obligatorios', 400)
            }
            const missionExisting = await missionRepository.findMissionsByUserId(user_id)

=======
            if(!title){
                throw new ServerError('El título es obligatorio', 400)
            }
            if (typeof title !== 'string' || title.trim().length < 3) {
                throw new ServerError('El título debe ser un texto de al menos 3 caracteres', 400);
            }
            if (description && (typeof description !== 'string' || description.trim().length < 6)) {
                throw new ServerError('La descripción debe tener al menos 6 caracteres', 400);
            }   

            const missionExisting = await missionRepository.findMissionsByUserId(user_id)
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
            if(missionExisting.some(mission => mission.title === title && mission.description === description)){
                throw new ServerError('Esta misión ya existe para este usuario', 400)
            }

            req.missionData = {
                fk_user_id: user_id,
                title,
                description
            }
            next()
        }
        catch(error){
            next(error);
        }
    }
<<<<<<< HEAD
=======
    async checkMissionOwnership(req, res, next) {
        try{
            const {user_id, mission_id} = req.params
            const missionFound = await missionRepository.findMissionByID(mission_id)
            if(!missionFound){
                throw new ServerError('Misión no encontrada', 404)
            }
            if(missionFound.fk_user_id.toString() !== user_id){
                throw new ServerError('No tienes permiso para eliminar esta misión', 403)
            }
            req.mission = missionFound
            next()
        }
        catch(error){
            next(error);
        }
    }
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
}

export default new MissionMiddleware();