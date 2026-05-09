import express from 'express';
import orderController from '../controllers/order.controller.js';
import { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/', verifyAuthTokenMiddleware(), orderController.createOrder);
orderRouter.get('/', verifyAuthTokenMiddleware(), orderController.getMyOrders);

export default orderRouter;
