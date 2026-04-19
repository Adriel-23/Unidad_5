import userController from "../controllers/user.controller.js";
import express from 'express';


const authRouter = express.Router();

authRouter.post(
    '/register',
    userController.registerUser
)

authRouter.post(
    '/login',
    userController.loginUser
)
authRouter.get(
    '/verify-email',
    userController.verifyEmail
)

export default authRouter; 