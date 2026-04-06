import userController from "../controllers/user.controller.js";
import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
    '/register',
    authMiddleware.validateUser,
    (req, res) => { userController.registerUser(req, res) }
)


authRouter.post(
    '/login',
    authMiddleware.validateUser,
    (req, res) => { userController.loginUser(req, res) }
)

export default authRouter; 