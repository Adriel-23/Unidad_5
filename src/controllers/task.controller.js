import ServerError from "../helpers/serverError.helper.js";
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
                    message: 'Error al obtener las tareas: ' + error.message
                })
            }
        }
    }
    async getDetailTaskById(req, res){
        try{
            const task_id = req.params.task_id
            const taskDetail = await taskRepository.getDetailTaskById(task_id)
            if(!taskDetail){
                throw new ServerError('No existe la tarea con el id proporcionado', 404)
            }
            res.status(200).json(taskDetail)
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
                    message: 'Error al obtener el detalle de la tarea: ' + error.message
                })
            }
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
                throw new ServerError('No existe la tarea con el id proporcionado', 404)
            }
            res.status(200).json(updatedTask)
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
                    message: 'Error al actualizar la tarea: ' + error.message
                })
            }
        }
    }
    async updateStatusAndFinishDate(req, res){
        try{
            const task_id = req.params.task_id
            const { status } = req.body
            const updateData = { status: status }
            const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED']
            if(!validStatuses.includes(status)){
                throw new ServerError('Estado no válido. Los estados permitidos son: PENDING, IN_PROGRESS, COMPLETED', 400)
            }
            if(status === 'COMPLETED'){
                updateData.finish_date = new Date()
            }
            const updatedStatusTask = await taskRepository.updateStatusAndFinishDate(task_id, updateData)
            if(!updatedStatusTask){
                throw new ServerError('No existe la tarea con el id proporcionado', 404)
            }
            res.status(200).json(updatedStatusTask)
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
                    message: 'Error al actualizar el estado de la tarea: ' + error.message
                })
            }
        }
    }
    async deleteTask(req, res){
        try{
            const task_id = req.params.task_id
            const deletedTask = await taskRepository.deleteTask(task_id)
            if(!deletedTask){
                throw new ServerError('No existe la tarea con el id proporcionado', 404)
            }
            res.status(200).send({message: 'Tarea eliminada exitosamente'})
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
                    message: 'Error al eliminar la tarea: ' + error.message
                })
            }
        }
    }
}


export default new TaskController();