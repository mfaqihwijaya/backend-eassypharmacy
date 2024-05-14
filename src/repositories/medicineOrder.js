class MedicineOrderPostgres {
    constructor(db) {
        this.MedicineOrder = db.MedicineOrder;
    }

    async createMedicineOrder(medicineOrder, transaction = null) {
        try {
            await this.MedicineOrder.create(medicineOrder, { transaction })
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
            throw error;
        }
    }

    async getMedicineOrders(userId) {
        try {
            const medicineOrders = await this.MedicineOrder.findAll({
                where: {userId: userId, deletedAt: null }
            })
            return medicineOrders
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
            throw error;
        }
    }

    async getMedicineOrderById(medicineOrderId) {
        try {
            const medicineOrder = await this.MedicineOrder.findOne({ where: { id: medicineOrderId, deletedAt: null } })
            return medicineOrder
        } catch (err) {
            const error = new Error(err.message);
            error.status = 500;
            throw error
        }
    }
}

module.exports = { MedicineOrderPostgres }