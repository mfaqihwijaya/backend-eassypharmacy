const { Sequelize } = require('../models/db');

class MedicineOrderPostgres {
    constructor(db) {
        this.MedicineOrder = db.MedicineOrder;
        this.Medicine = db.Medicine;
    }

    async createMedicineOrder(medicineOrder, transaction) {
        await this.MedicineOrder.create(medicineOrder, { transaction });
    }

    async getMedicineOrders(userId) {
        const medicineOrders = await this.MedicineOrder.findAll({
            where: { userId: userId, orderId: null, deletedAt: null },
            attributes: { exclude: ['updatedAt', 'deletedAt'] },
            include: [
                {
                    model: this.Medicine,
                    attributes: [
                        'id',
                        'name',
                        'description',
                        'price',
                        'image',
                    ],
                },
            ],
        });
        return medicineOrders;
    }

    async getMedicineOrderById(medicineOrderId, transaction = null) {
        const medicineOrder = await this.MedicineOrder.findOne({
            where: { id: medicineOrderId, deletedAt: null },
            transaction,
        });
        return medicineOrder;
    }
    async getMedicineOrderByOrderId(orderId, transaction) {
        const medicineOrders = await this.MedicineOrder.findAll({
            where: { orderId: orderId, deletedAt: null },
            transaction,
        });
        return medicineOrders;
    }
    async getMedicineOrderByIds(medicineOrderIds, transaction) {
        const medicineOrders = await this.MedicineOrder.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: medicineOrderIds,
                },
                orderId: null,
                deletedAt: null,
            },
            transaction,
        });
        return medicineOrders;
    }
    async getMedicineOrderByMedicineId(userId, medicineId, transaction = null) {
        const medicineOrder = await this.MedicineOrder.findOne({
            where: { userId, medicineId, orderId: null, deletedAt: null },
            transaction,
        });
        return medicineOrder;
    }
    async updateMedicineOrder(medicineOrder, transaction) {
        const [affectedRows] = await this.MedicineOrder.update(
            medicineOrder,
            {
                where: { id: medicineOrder.id },
                transaction,
            }
        );
        return affectedRows;
    }
    async deleteMedicineOrder(medicineOrderId, transaction) {
        const affectedRows = await this.MedicineOrder.destroy({
            where: { id: medicineOrderId, orderId: null },
            transaction,
        });
        return affectedRows;
    }
}

module.exports = { MedicineOrderPostgres };
