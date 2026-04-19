import ServerError from "../helpers/serverError.helper.js";
import missionRepository from "../repositories/mission.repository.js";

class MissionMiddleware {
    async validateMissionData(req, res, next){
        try{
            const user_id = req.user.user_id
            const { title } = req.body
            if(!title){
                throw new ServerError('Título es obligatorio', 400)
            }
            const missionExisting = await missionRepository.findMissionsByUserId(user_id)

            if(missionExisting.some(mission => mission.title === title)){
                throw new ServerError('Esta misión ya existe para este usuario', 400)
            }

            req.missionData = {
                fk_user_id: user_id,
                title
            }
            next()
        }
        catch(error){
            next(error);
        }
    }
}

export default new MissionMiddleware();