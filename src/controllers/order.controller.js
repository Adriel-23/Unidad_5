import orderRepository from "../repositories/order.repository.js";
import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/serverError.helper.js";

class OrderController {
    async createOrder(req, res, next) {
        try {
            const user_id = req.user.user_id; // From verifyAuthTokenMiddleware
            
            // For a mockup, we can just receive the cart items from the body or fetch them from the user document.
            // Let's fetch them from the user document to simulate a real checkout flow.
            const user = await userRepository.findUserById(user_id);
            await user.populate('cart.product');

            if (!user.cart || user.cart.length === 0) {
                throw new ServerError('El carrito está vacío', 400);
            }

            let total = 0;
            const items = user.cart.map(cartItem => {
                const itemTotal = cartItem.quantity * cartItem.product.price;
                total += itemTotal;
                return {
                    product: cartItem.product._id,
                    quantity: cartItem.quantity,
                    price_at_purchase: cartItem.product.price
                };
            });

            const orderData = {
                user_id,
                items,
                total,
                status: 'completed'
            };

            const newOrder = await orderRepository.createOrder(orderData);

            // Empty the cart
            user.cart = [];
            await user.save();

            res.status(201).json({
                ok: true,
                status: 201,
                message: 'Pedido realizado con éxito',
                data: newOrder
            });
        } catch (error) {
            next(error);
        }
    }

    async getMyOrders(req, res, next) {
        try {
            const user_id = req.user.user_id;
            const orders = await orderRepository.findOrdersByUserId(user_id);
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Pedidos obtenidos',
                data: orders
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
