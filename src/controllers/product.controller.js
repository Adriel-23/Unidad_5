import productRepository from "../repositories/product.repository.js";
import ServerError from "../helpers/serverError.helper.js";

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await productRepository.findAllProducts();
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Productos obtenidos con éxito',
                data: products
            });
        } catch (error) {
            next(error);
        }
    }

    async seedProducts(req, res, next) {
        try {
            const productsToSeed = req.body;
            if (!Array.isArray(productsToSeed) || productsToSeed.length === 0) {
                throw new ServerError('Se espera un array de productos en el body', 400);
            }
            const seeded = await productRepository.insertManyProducts(productsToSeed);
            res.status(201).json({
                ok: true,
                status: 201,
                message: 'Productos insertados con éxito',
                data: seeded
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productRepository.findProductById(id);
            if (!product) {
                throw new ServerError('Producto no encontrado', 404);
            }
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Producto obtenido con éxito',
                data: product
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
