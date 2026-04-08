import express from 'express';
import taskController from '../controllers/task.controller.js';
import taskMiddleware from '../middlewares/task.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const taskRouter = express.Router()

taskRouter.post(
    '/:user_id/:mission_id',
    authMiddleware.validateUser,
    taskMiddleware.validateStatusFormat,
    taskController.createTask
)
taskRouter.get(
    '/:user_id/:mission_id',
    authMiddleware.validateUser,
    taskMiddleware.validateTaskInMission,
    taskController.getTasksByMissionId
    
)
taskRouter.get(
    '/:user_id/detail/:task_id',
    authMiddleware.validateUser,
    taskMiddleware.validateTaskExistence,
    taskController.getDetailTaskById
)
taskRouter.put(
    '/:user_id/:task_id',
    authMiddleware.validateUser,
    taskMiddleware.validateTaskExistence,
    taskController.updateTask
)
taskRouter.patch(
    '/:user_id/:task_id/status',
    authMiddleware.validateUser,
    taskMiddleware.validateStatusFormat,
    taskMiddleware.validateTaskExistence,
    taskController.updateStatusAndFinishDate
)
taskRouter.delete(
    '/:user_id/:task_id',
    authMiddleware.validateUser,
    taskMiddleware.validateTaskExistence,
    taskController.deleteTask
)

export default taskRouter;