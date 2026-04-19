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
<<<<<<< HEAD
)
authRouter.get(
    '/verify-email',
    userController.verifyEmail
=======
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
)

export default authRouter; 