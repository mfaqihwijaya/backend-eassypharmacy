class OrderPostgres {
    constructor(db) {
        this.Order = db.Medicine
    }

    async getOrders(userId) {
        try {
            const orders = await this.Order.findAll({
                where: { userId, status: 0, deletedAt: null },
                transaction
            })
            return orders
        } catch (err) {
            throw err;
        }
    }

    async getOrderById(orderId) {
        try {
            const order = await this.Order.findOne({ 
                where: { id: orderId, deletedAt: null },
                transaction
            })
            return order
        } catch (err) {
            throw err;
        }
    }

    async updateOrder(order, transaction = null) {
        try {
            const [affectedRows] = await this.Order.update(order, {
                 where: { id: order.id, userId: order.userId },
                 transaction
            })
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicinePostgres }