const { DataTypes } = require("sequelize")
const { MedicineOrder } = require("../model/medicineOrder")
class MedicineOrderPostgres {
    constructor(sequelize) {
        MedicineOrder.init({
            'userId': DataTypes.INTEGER,
            'medicineId': DataTypes.INTEGER,
            count: DataTypes.INTEGER,
            'subTotal': DataTypes.FLOAT,
            'deletedAt': DataTypes.DATE,
            'updatedAt': DataTypes.DATE,
        }, { sequelize, modelName: 'medicineOrder', tableName: "medicineOrders" })
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