class MedicineOrderPostgres {
    constructor(db) {
        this.MedicineOrder = db.MedicineOrder;
    }

    async createMedicineOrder(medicineOrder, transaction = null) {
        try {
            await this.MedicineOrder.create(medicineOrder, { transaction })
        } catch (err) {
            throw err;
        }
    }

    async getMedicineOrders(userId) {
        try {
            const medicineOrders = await this.MedicineOrder.findAll({
                where: {userId: userId, deletedAt: null }
            })
            return medicineOrders
        } catch (err) {
            throw err;
        }
    }

    async getMedicineOrderById(medicineOrderId) {
        try {
            const medicineOrder = await this.MedicineOrder.findOne({ where: { id: medicineOrderId, deletedAt: null } })
            return medicineOrder
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicineOrderPostgres }