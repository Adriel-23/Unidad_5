import express from 'express';
import taskController from '../controllers/task.controller.js';
import taskMiddleware from '../middlewares/task.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const taskRouter = express.Router()

taskRouter.post(
    '/:user_id/:mission_id',
    authMiddleware(['admin']),
    taskMiddleware.validateStatusFormat,
    taskController.createTask
)
taskRouter.get(
    '/:user_id/:mission_id',
    authMiddleware(['admin', 'free', 'premium']),
    taskMiddleware.validateTaskInMission,
    taskController.getTasksByMissionId
    
)
taskRouter.get(
    '/:user_id/detail/:task_id',
    authMiddleware(['admin', 'free', 'premium']),
    taskMiddleware.validateTaskExistence,
    taskController.getDetailTaskById
)
taskRouter.put(
    '/:user_id/:task_id',
    authMiddleware(['admin', 'premium']),
    taskMiddleware.validateTaskExistence,
    taskController.updateTask
)
taskRouter.patch(
    '/:user_id/:task_id/status',
    authMiddleware(['admin', 'free', 'premium']),
    taskMiddleware.validateStatusFormat,
    taskMiddleware.validateTaskExistence,
    taskController.updateStatusAndFinishDate
)
taskRouter.delete(
    '/:user_id/:task_id',
    authMiddleware(['admin']),
    taskMiddleware.validateTaskExistence,
    taskController.deleteTask
)

export default taskRouter;