import express from 'express'
import statusController from '../controllers/status.controller.js'
import authMiddleware, { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js'


const statusRouter = express.Router()

statusRouter.get('/', verifyAuthTokenMiddleware(['premium']), statusController.get)

export default statusRouter