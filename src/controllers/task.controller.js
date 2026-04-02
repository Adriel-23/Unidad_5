import taskRepository from "../repositories/task.repository.js";

class TaskController {
    async createTask(req, res){
        try{
            const mission_id = req.params.mission_id
            const {
                description,
                status,
                difficulty,
                estimated_time_minutes,

            } = req.body
            const taskData = {
                fk_mission_id: mission_id,
                description,
                status,
                difficulty,
                estimated_time_minutes
            }
            const newTask = await taskRepository.createTask(taskData)
            res.status(201).json(newTask)
        }
        catch(error){
            res.status(500).json({error: 'Error al crear la tarea: ' + error.message})
        }
    }
}

export default new TaskController();