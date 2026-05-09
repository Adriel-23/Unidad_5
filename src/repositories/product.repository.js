import Product from "../models/product.model.js";

class ProductRepository {
    async findAllProducts() {
        try {
            return await Product.find({});
        } catch (error) {
            throw new Error(`Error al buscar productos: ${error.message}`);
        }
    }

    async insertManyProducts(productsData) {
        try {
            return await Product.insertMany(productsData);
        } catch (error) {
            throw new Error(`Error al insertar productos: ${error.message}`);
        }
    }

    async findProductById(productId) {
        try {
            // Buscamos tanto por _id como por el campo id si existe (para compatibilidad con el seed manual)
            return await Product.findOne({
                $or: [
                    { _id: productId },
                    { id: productId }
                ]
            });
        } catch (error) {
            throw new Error(`Error al buscar producto por ID: ${error.message}`);
        }
    }
}

export default new ProductRepository();
