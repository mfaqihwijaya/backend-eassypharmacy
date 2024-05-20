const { sequelize } = require("../models/db");
const { ErrorMessage } = require("../models/response");

class OrderService {
    constructor(orderRepo, userRepo) {
        this.orderRepo = orderRepo
        this.userRepo = userRepo
    }

    async getOrders(userId) {
        try {
            const user = await this.userRepo.getUserById(userId);
            if (!user) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND);
                error.status = 404;
                throw error;
            }
            const orders = await this.orderRepo.getOrders(userId);
            return orders;
        } catch (error) {
            throw error;
        }
    }
    async getOrderById(userId, orderId) {
        try {
            const order = await this.orderRepo.getOrderById(orderId);
            if (!order) {
                const error = new Error(ErrorMessage.ERROR_ORDER_NOT_FOUND)
                error.status = 404
                throw error
            }
            if (order.userId != userId) {
                const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS)
                error.status = 403
                throw error
            }
            return order
        } catch (error) {
            throw error
        }
    }
    async updateOrderAddress(userId, orderId, address) {
        try {
            const updateData = {
                id: orderId,
                userId,
                address
            }
            const affectedRows = await this.orderRepo.updateOrder(updateData);
            return affectedRows
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicineOrderService }