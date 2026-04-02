import express from 'express';
import taskController from '../controllers/task.controller.js';

const taskRouter = express.Router()

taskRouter.post(
    '/:mission_id',
    (req, res) => { taskController.createTask(req, res) }
)

export default taskRouter;