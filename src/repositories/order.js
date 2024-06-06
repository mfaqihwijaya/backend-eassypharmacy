class OrderPostgres {
    constructor(db) {
        this.Order = db.Order
        this.User = db.User
        this.MedicineOrder = db.MedicineOrder
        this.Medicine = db.Medicine
    }
    async createOrder(order, transaction = null) {
        const newOrder = await this.Order.create(order, { transaction })
        return newOrder
    }
    // TODO jadikan bisa filter by status, default no filter by status
    // TODO order by created at
    async getOrders(userId, transaction = null) {
        const orders = await this.Order.findAll({
            where: { userId, status: 0, deletedAt: null },
            attributes: { exclude: ['deletedAt', 'updatedAt'] },
            include: [
                {
                    model: this.User,
                    attributes: ['id', 'phoneNumber']
                },
                {
                    model: this.MedicineOrder,
                    attributes: ['id', 'count', 'subTotal'],
                    include: [
                        {
                            model: this.Medicine,
                            attributes: ['id', 'name', 'price', 'image']
                        },
                    ]
                }
            ],
            transaction
        })
        return orders
    }

    async getOrderById(orderId, transaction = null) {
        const order = await this.Order.findOne({ 
            where: { id: orderId, deletedAt: null },
            attributes: { exclude: ['deletedAt', 'updatedAt'] },
            transaction
        })
        return order
    }

    async updateOrder(orderId, order, transaction = null) {
        const [affectedRows] = await this.Order.update(order, {
                where: { id: orderId},
                transaction
        })
        return affectedRows;
    }
}

module.exports = { OrderPostgres }