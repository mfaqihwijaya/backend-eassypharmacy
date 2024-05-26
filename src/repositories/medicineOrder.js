const { Sequelize } = require("../models/db");

class MedicineOrderPostgres {
    constructor(db) {
        this.MedicineOrder = db.MedicineOrder;
        this.Medicine = db.Medicine;
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
                where: {userId: userId, orderId:null, deletedAt: null },
                attributes: { exclude: ['updatedAt','deletedAt']},
                include: [
                    { 
                        model: this.Medicine, 
                        attributes: ['id', 'name', 'description', 'price', 'image'] 
                    }
                ]
            })
            return medicineOrders
        } catch (err) {
            throw err;
        }
    }

    async getMedicineOrderById(medicineOrderId, transaction = null) {
        try {
            const medicineOrder = await this.MedicineOrder.findOne({ 
                where: { id: medicineOrderId, deletedAt: null }, 
                transaction 
            })
            return medicineOrder
        } catch (err) {
            throw err;
        }
    }
    async getMedicineOrderByOrderId(orderId, transaction = null) {
        try {
            const medicineOrders = await this.MedicineOrder.findAll({ 
                where: { orderId: orderId, deletedAt: null }, 
                transaction 
            })
            return medicineOrders
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
    async getMedicineOrderByMedicineId(userId, medicineId, transaction = null) {
        try {
            const medicineOrder = await this.MedicineOrder.findOne({ 
                where: { userId, medicineId, orderId:null, deletedAt: null }, 
                transaction 
            })
            return medicineOrder
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
    async deleteMedicineOrder(medicineOrderId, transaction = null) {
        try {
            const affectedRows = await this.MedicineOrder.destroy({
                where: { id: medicineOrderId },
                transaction
            })
            return affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { MedicineOrderPostgres }