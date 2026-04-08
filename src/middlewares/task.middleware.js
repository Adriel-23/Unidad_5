import missionRepository from "../repositories/mission.repository.js";
import ServerError from "../helpers/serverError.helper.js";
import taskRepository from "../repositories/task.repository.js";

class TaskMiddleware {
    async validateTaskExistence(req, res, next){
        try{
            const task_id = req.params.task_id
            const task = await taskRepository.getDetailTaskById(task_id)
            if(!task){
                throw new ServerError('No existe la tarea con el id proporcionado', 404)
        }
            req.task = task
            next()
        }
        catch(error){
            next(error)
        }
    }

    async validateTaskInMission(req, res, next){
        try{
            const mission_id = req.params.mission_id
            const tasks = await taskRepository.getTasksByMissionId(mission_id)
            if(tasks.length === 0){
                throw new ServerError('No existen tareas para la mision con el id proporcionado', 404)
            }
            req.tasks = tasks
            next()
        }
        catch(error){
            next(error)
        }
    }

    async validateStatusFormat(req, res, next){
        try{
            const { status } = req.body
            const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

            if(status && !validStatuses.includes(status)){
                throw new ServerError('Estado no válido. Los estados permitidos son: PENDING, IN_PROGRESS, COMPLETED', 400)
            }
            next()
        }
        catch(error){
            next(error)
        }
    }
}

const taskMiddleware = new TaskMiddleware()
export default taskMiddleware