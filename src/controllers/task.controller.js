import ServerError from "../helpers/serverError.helper.js";
import taskRepository from "../repositories/task.repository.js";

class TaskController {
    async createTask(req, res, next){
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
            next(error)
        }
    }

    async getTasksByMissionId(req, res, next){
        try{
            const tasks = req.tasks
            res.status(200).json(tasks)
        }
        catch(error){
            next(error)
        }
    }

    async getDetailTaskById(req, res, next){
        try{
            const taskDetail = req.task
            res.status(200).json(taskDetail)
        }
        catch(error){
            next(error)
        }
    }
    async updateTask(req, res, next){
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
            res.status(200).json(updatedTask)
        }
        catch(error){
            next(error)
        }
    }
    async updateStatusAndFinishDate(req, res, next){
        try{
            const task_id = req.params.task_id
            const { status } = req.body
            const updateData = { status: status }
            
            if(status === 'COMPLETED'){
                updateData.finish_date = new Date()
            }
            const updatedStatusTask = await taskRepository.updateStatusAndFinishDate(task_id, updateData)
            res.status(200).json(updatedStatusTask)
        }
        catch(error){
            next(error)
        }
    }
    async deleteTask(req, res, next){
        try{
            const task_id = req.params.task_id
            const deletedTask = await taskRepository.deleteTask(task_id)
            res.status(200).send({message: 'Tarea eliminada exitosamente'})
        }
        catch(error){
            next(error)
        }
    }
}


export default new TaskController();