const { Sequelize } = require("../models/db");

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
                where: {userId: userId, orderId:null, deletedAt: null }
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
    async getMedicineOrderByIds(medicineOrderIds, transaction = null) {
        try {
            const medicineOrders = await this.MedicineOrder.findAll({ 
                where: { id: {
                    [Sequelize.Op.in]: medicineOrderIds 
                }, orderId:null, deletedAt: null }, transaction })
            return medicineOrders
        } catch (err) {
            throw err;
        }
    }
    async updateMedicineOrder(medicineOrder, transaction = null) {
        try {
            const [affectedRows] = await this.MedicineOrder.update(medicineOrder, {
                where: { id: medicineOrder.id },
                transaction
            })
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicineOrderPostgres }