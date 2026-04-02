import express from 'express';
import missionController from '../controllers/mission.controller.js';


const missionRouter = express.Router();

missionRouter.post(
    '/:user_id', 
    (req, res) => { missionController.createMission(req, res) }
)
missionRouter.get(
    '/:user_id',
    (req, res) => { missionController.getMissionsByUserId(req, res) }
)
missionRouter.delete(
    '/:mission_id',
    (req, res) => { missionController.deleteMissionById(req, res) }
)

export default missionRouter;