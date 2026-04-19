import express from 'express';
import missionController from '../controllers/mission.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import missionMiddleware from '../middlewares/mission.middleware.js';


const missionRouter = express.Router();

missionRouter.post(
    '/:user_id', 
    authMiddleware.validateUser,
    missionMiddleware.validateMissionData,
    missionController.createMission
)
missionRouter.get(
    '/:user_id',
    authMiddleware.validateUser,
    missionController.getMissionsByUserId
)
missionRouter.delete(
    '/:user_id/:mission_id',
    authMiddleware.validateUser,
    missionController.deleteMissionById
)

export default missionRouter;