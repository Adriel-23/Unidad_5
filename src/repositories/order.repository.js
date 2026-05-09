import Order from "../models/order.model.js";

class OrderRepository {
    async createOrder(orderData) {
        try {
            const newOrder = new Order(orderData);
            return await newOrder.save();
        } catch (error) {
            throw new Error(`Error al crear el pedido: ${error.message}`);
        }
    }

    async findOrdersByUserId(user_id) {
        try {
            return await Order.find({ user_id }).populate('items.product').sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`Error al buscar pedidos: ${error.message}`);
        }
    }
}

export default new OrderRepository();
