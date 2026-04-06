import express from 'express';
import taskController from '../controllers/task.controller.js';

const taskRouter = express.Router()

taskRouter.post(
<<<<<<< HEAD
    '/:mission_id',
    (req, res) => { taskController.createTask(req, res) }
=======
    '/:user_id/:mission_id',
    (req, res) => { 
        taskController.createTask(req, res) 
    }
)
taskRouter.get(
    '/:user_id/:mission_id',
    (req, res) => {
        taskController.getTasksByMissionId(req, res)
    }
)
taskRouter.get(
    '/:user_id/detail/:task_id',
    (req, res) => {
        taskController.getDetailTaskById(req, res)
    }
)
taskRouter.put(
    '/:user_id/:task_id',
    (req, res)=> {
        taskController.updateTask(req, res)
    }
)
taskRouter.patch(
    '/:user_id/:task_id/status',
    (req, res) => {
        taskController.updateStatusAndFinishDate(req, res)
    } 
)
taskRouter.delete(
    '/:user_id/:task_id',
    (req, res) => {
        taskController.deleteTask(req, res)
    }
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
)

export default taskRouter;