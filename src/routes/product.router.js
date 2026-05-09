import express from 'express';
import productController from '../controllers/product.controller.js';

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Obtención de productos para el catálogo
 */

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/seed', productController.seedProducts);

export default productRouter;
