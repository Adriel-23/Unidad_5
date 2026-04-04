import missionRepository from "../repositories/mission.repository.js";
import Task from "../models/task.model.js";

class MissionController {
    async createMission(req, res){
        try{
            const userId = req.params.user_id
            const { title, description } = req.body
            const missionData = {
                fk_user_id: userId,
                title,
                description
            }
            const newMission = await missionRepository.createMission(missionData)
            res.status(201).json(newMission)
        }
        catch(error){
            res.status(500).json({error: 'Error al crear la misión: ' + error.message})
        }
    }
    async getMissionsByUserId(req, res){
        try{
            const userId = req.params.user_id
            const userMisisons = await missionRepository.findMissionsByUserId(userId)
            res.status(200).json(userMisisons)
        }
        catch(error){
                res.status(500).json({error: 'Error al obtener misiones por ID de usuario: ' + error.message})
        }
    }
    async deleteMissionById(req, res){
        try{
            const missionId = req.params.mission_id
            await Task.deleteMany({ fk_mission_id: missionId })
            const deletedMission = await missionRepository.deleteMissionById(missionId)
            if(!deletedMission){
                return res.status(404).json({error: 'Misión no encontrada'})
            }
            res.status(200).json({message: 'Misión eliminada exitosamente'})
        }
        catch(error){
            res.status(500).json({error: 'Error al eliminar la mision' + error.message})
        }
    }
}

export default new MissionController();