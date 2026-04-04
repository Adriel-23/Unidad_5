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
    async getTasksByMissionId(req, res){
        try{
            const mission_id = req.params.mission_id
            const tasks = await taskRepository.getTasksByMissionId(mission_id)
            if(tasks.length === 0){
                return res.status(404).json({error: 'No existen tareas para la mision con el id proporcionado'})
            }
            res.status(200).json(tasks)
        }
        catch(error){
            res.status(500).json({error: 'Error al obtener las tareas: ' + error.message})
        }
    }
    async getDetailTaskById(req, res){
        try{
            const task_id = req.params.task_id
            const taskDetail = await taskRepository.getDetailTaskById(task_id)
            if(!taskDetail){
                return res.status(404).json({error: 'No existe la tarea con el id proporcionado'})
            }
            res.status(200).json(taskDetail)
        }
        catch(error){
            res.status(500).json({error: 'Error al obtener el detalle de la tarea: ' + error.message})
        }
    }
    async updateTask(req, res){
        try{
            const task_id = req.params.task_id
            const { 
                description, 
                difficulty, 
                estimated_time_minutes 
            } = req.body
            const updateData = {
                description,
                difficulty,
                estimated_time_minutes
            }
            const updatedTask = await taskRepository.updateTask(task_id, updateData)
            if(!updatedTask){
                return res.status(404).json({error:' No existe la tarea con el id proporcionado'})
            }
            res.status(200).json(updatedTask)
        }
        catch(error){
            res.status(500).json({error: 'Error al actualizar la tarea: ' + error.message})
        }
    }
    async updateStatusAndFinishDate(req, res){
        try{
            const task_id = req.params.task_id
            const { status } = req.body
            const updateData = { status: status }
            const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED']
            if(!validStatuses.includes(status)){
                return res.status(400).json({error: 'El estado proporcionado no es válido. Debe ser PENDING, IN_PROGRESS o COMPLETED'})
            }
            if(status === 'COMPLETED'){
                updateData.finish_date = new Date()
            }
            const updatedStatusTask = await taskRepository.updateStatusAndFinishDate(task_id, updateData)
            if(!updatedStatusTask){
                return res.status(404).json({error: 'No existe la tarea con el id proporcionado'})
            }
            res.status(200).json(updatedStatusTask)
        }
        catch(error){
            res.status(500).json({error: 'Error al actualizar el estado de la tarea: ' + error.message})
        }
    }
    async deleteTask(req, res){
        try{
            const task_id = req.params.task_id
            const deletedTask = await taskRepository.deleteTask(task_id)
            if(!deletedTask){
                return res.status(404).json({error: 'No existe la tarea con el id proporcionado'})
            }
            res.status(200).json({message: 'Tarea eliminada exitosamente'})
        }
        catch(error){
            res.status(500).json({error: 'Error al eliminar la tarea: ' + error.message})
        }
    }
}

export default new TaskController();