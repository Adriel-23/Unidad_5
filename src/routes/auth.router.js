import userController from "../controllers/user.controller.js";
import express from 'express';
<<<<<<< HEAD
=======
import authMiddleware from "../middlewares/auth.middleware.js";
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f

const authRouter = express.Router();

authRouter.post(
    '/register',
<<<<<<< HEAD
=======
    authMiddleware.validateUser,
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
    (req, res) => { userController.registerUser(req, res) }
)


authRouter.post(
    '/login',
<<<<<<< HEAD
=======
    authMiddleware.validateUser,
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
    (req, res) => { userController.loginUser(req, res) }
)

export default authRouter; 