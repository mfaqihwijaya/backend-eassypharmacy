class OrderPostgres {
    constructor(db) {
        this.Order = db.Order
    }
    async createOrder(order, transaction = null) {
        try {
            const newOrder = await this.Order.create(order, { transaction })
            return newOrder
        } catch (err) {
            throw err;
        }
    }
    // TODO jadikan bisa filter by status, default no filter by status
    // TODO order by created at
    async getOrders(userId, transaction = null) {
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

    async getOrderById(orderId, transaction = null) {
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

    async updateOrder(orderId, userId, order, transaction = null) {
        try {
            const [affectedRows] = await this.Order.update(order, {
                 where: { id: orderId, userId},
                 transaction
            })
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { OrderPostgres }