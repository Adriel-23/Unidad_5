import express from 'express';
import userController from '../controllers/user.controller.js';
import { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// Favoritos
userRouter.post('/favorites/:product_id', verifyAuthTokenMiddleware(), userController.toggleFavorite);
userRouter.get('/favorites', verifyAuthTokenMiddleware(), userController.getFavorites);

// Carrito
userRouter.post('/cart/:product_id', verifyAuthTokenMiddleware(), userController.addToCart);
userRouter.delete('/cart/:product_id', verifyAuthTokenMiddleware(), userController.removeFromCart);
userRouter.get('/cart', verifyAuthTokenMiddleware(), userController.getCart);

export default userRouter;
