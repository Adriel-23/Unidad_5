import ServerError from "../helpers/serverError.helper.js";
import missionRepository from "../repositories/mission.repository.js";

class MissionMiddleware {
    async validateMissionData(req, res, next){
        try{
            const {user_id} = req.params
            const { title, description } = req.body
            if(!title || !description){
                throw new ServerError('Título y descripción son obligatorios', 400)
            }
            const missionExisting = await missionRepository.findMissionsByUserId(user_id)

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
}

export default new MissionMiddleware();