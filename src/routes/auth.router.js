import userController from "../controllers/user.controller.js";
import express from 'express';

const authRouter = express.Router();

authRouter.post(
    '/register',
    (req, res) => { userController.registerUser(req, res) }
)


authRouter.post(
    '/login',
    (req, res) => { userController.loginUser(req, res) }
)

export default authRouter; 