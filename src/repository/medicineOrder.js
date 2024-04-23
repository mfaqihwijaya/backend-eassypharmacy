class MedicineOrderPostgres {
    constructor(db) {
        this.MedicineOrder = db.MedicineOrder;
    }

    async createMedicineOrder(medicineOrder) {
        try {
            await MedicineOrder.create({
                userId: medicineOrder.userId,
                medicineId: medicineOrder.medicineId,
                count: medicineOrder.count,
                subTotal: medicineOrder.subTotal,
            })
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrders() {
        try {
            const medicineOrders = await MedicineOrder.findAll({
                where: { deletedAt: null }
            })
            return medicineOrders
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrderById(medicineOrderId) {
        try {
            const medicineOrder = await MedicineOrder.findOne({ where: { id: medicineOrderId, deletedAt: null } })
            return medicineOrder
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicineOrderPostgres }