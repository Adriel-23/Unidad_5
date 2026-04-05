import missionRepository from "../repositories/mission.repository.js";
import Task from "../models/task.model.js";
import userRepository from "../repositories/user.repository.js";

class MissionController {
    async createMission(req, res){
        try{
            const {user_id} = req.params
            const { title, description } = req.body
            const userFound = await userRepository.findUserById(user_id)
            if(!userFound){
                return res.send({
                    ok: false,
                    status: 404,
                    message: 'Usuario no encontrado'})
            }
            const missionExisting = await missionRepository.findMissionsByUserId(user_id)
            if(missionExisting.some(mission => mission.title === title && mission.description === description)){
                return res.send({
                    ok: false,
                    status: 400,
                    message: 'Esta mision ya existe para este usuario'})
            }
            const missionData = {
                fk_user_id: user_id,
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
            const {user_id} = req.params
            const userMisisons = await missionRepository.findMissionsByUserId(user_id)
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