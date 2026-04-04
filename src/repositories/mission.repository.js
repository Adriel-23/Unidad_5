import Mission from "../models/mission.model.js";


class MissionRepository {

    async createMission(missionData){

        try{
            const newMission = new Mission(missionData)
            await newMission.save()
            return newMission
        }
        catch(error){
            throw new Error('Error al crear la misión: ' + error.message)
        }
    }
    async findMissionsByUserId(userId){
        try{
            const userMissions = await Mission.find({fk_user_id: userId})
            return userMissions
        }
        catch(error){
            throw new Error('Error al buscar misiones por ID de usuario: ' + error.message)
        }
    }
    async deleteMissionById(missionId){
        try{
            const deletedMission = await Mission.findByIdAndDelete(missionId)
            return deletedMission
        }
        catch(error){
            throw new Error('Error al eliminar misión por ID: ' + error.message)
        }
    }
}

export default new MissionRepository();