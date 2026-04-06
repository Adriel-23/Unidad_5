import missionRepository from "../repositories/mission.repository.js";
import Task from "../models/task.model.js";
import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/serverError.helper.js";


class MissionController {
    async createMission(req, res){
        try{
            const {user_id} = req.params
            const { title, description } = req.body
            const userFound = await userRepository.findUserById(user_id)
            if(!userFound){
                throw new ServerError('Usuario no encontrado', 404)
            }
            const missionExisting = await missionRepository.findMissionsByUserId(user_id)
            if(missionExisting.some(mission => mission.title === title && mission.description === description)){
                throw new ServerError('Esta misión ya existe para este usuario', 400)
            }
            const missionData = {
                fk_user_id: user_id,
                title,
                description
            }
            const newMission = await missionRepository.createMission(missionData)
            res.status(201).send(newMission)
        }
        catch(error){
            if(error instanceof ServerError){
                res.status(error.statusCode).send({
                    ok: false,
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                res.status(500).json({
                    ok: false,
                    status: 500,
                    message: 'Error al crear la misión: ' + error.message
                })
            }
        }
    }
    async getMissionsByUserId(req, res){
        try{
            const {user_id} = req.params
            const userMisisons = await missionRepository.findMissionsByUserId(user_id)
            if(userMisisons.length === 0){
                throw new ServerError('No se encontraron misiones para este usuario', 404)
            }
            res.status(200).send(userMisisons)
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
                    message: 'Error al obtener misiones por ID de usuario: ' + error.message
                })
            }
        }
    }
    async deleteMissionById(req, res){
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
                    message: 'Error al eliminar la misión: ' + error.message
                })
            }
        }
    }
}

export default new MissionController();