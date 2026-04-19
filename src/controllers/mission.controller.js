import missionRepository from "../repositories/mission.repository.js";
import Task from "../models/task.model.js";
import ServerError from "../helpers/serverError.helper.js";


class MissionController {
    async createMission(req, res, next){
        try{
            const missionData = req.missionData
            const newMission = await missionRepository.createMission(missionData)
            res.status(201).send(newMission)
        }
        catch(error){
            next(error);
        }
    }
    async getMissionsByUserId(req, res, next){
        try{
            const user_id = req.user.user_id
            const userMisisons = await missionRepository.findMissionsByUserId(user_id)
            if(userMisisons.length === 0){
                throw new ServerError('No se encontraron misiones para este usuario', 404)
            }
            res.status(200).send(userMisisons)
        }
        catch(error){
            next(error);
            
        }
    }
    async deleteMissionById(req, res, next){
        try{
            const missionId = req.params.mission_id
            await Task.deleteMany({ fk_mission_id: missionId })
            const deletedMission = await missionRepository.deleteMissionById(missionId)
            if(!deletedMission){
                throw new ServerError('Misión no encontrada', 404)
            }
            res.status(200).send({message: 'Misión eliminada exitosamente'})
        }
        catch(error){
            next(error);
        }
    }
}

export default new MissionController();