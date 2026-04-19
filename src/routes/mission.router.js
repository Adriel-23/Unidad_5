import express from 'express';
import missionController from '../controllers/mission.controller.js';
import authMiddleware, { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js';
import missionMiddleware from '../middlewares/mission.middleware.js';


const missionRouter = express.Router();

missionRouter.post(
    '/', 
    verifyAuthTokenMiddleware(['admin', 'premium']),
    missionMiddleware.validateMissionData,
    missionController.createMission
)
missionRouter.get(
    '/',
    verifyAuthTokenMiddleware(),
    missionController.getMissionsByUserId
)
missionRouter.delete(
    '/:mission_id',
    verifyAuthTokenMiddleware(['admin', 'premium']),
    missionController.deleteMissionById
)

export default missionRouter;