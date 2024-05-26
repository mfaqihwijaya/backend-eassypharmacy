const { sequelize } = require("../models/db");
const { ErrorMessage } = require("../models/response");

class MedicineOrderService {
    constructor(medicineOrderRepo, medicineRepo, userRepo) {
        this.medicineOrderRepo = medicineOrderRepo
        this.medicineRepo = medicineRepo
        this.userRepo = userRepo
    }

    async createMedicineOrder(medicineOrder) {
        try {
            const { userId, medicineId, count } = medicineOrder;
            const result = await sequelize.transaction(async (t) => {
                // check user & medicine is exist
                const user = await this.userRepo.getUserById(userId, t);
                if (!user) {
                    const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND);
                    error.status = 404;
                    throw error;
                }
                const medicine = await this.medicineRepo.getMedicineById(medicineId, t);
                if (!medicine) {
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_NOT_FOUND);
                    error.status = 404;
                    throw error;
                }
                // check medicine stock
                if(count > medicine.stock) {   
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH);
                    error.status = 500;
                    throw error;
                }
                // create order
                const subTotal = count * medicine.price;
                const newMedicineOrder = {
                    ...medicineOrder,
                    subTotal
                }
                await this.medicineOrderRepo.createMedicineOrder(newMedicineOrder, t);
                return newMedicineOrder;
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrders(userId) {
        try {
            const user = await this.userRepo.getUserById(userId);
            if (!user) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND);
                error.status = 404;
                throw error;
            }
            const medicineOrders = await this.medicineOrderRepo.getMedicineOrders(userId);
            return medicineOrders;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrderById(medicineOrderId, userId) {
        try {
            const medicineOrder = await this.medicineOrderRepo.getMedicineOrderById(medicineOrderId);
            if (!medicineOrder) {
                const error = new Error(ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND)
                error.status = 404
                throw error
            }
            if (medicineOrder.userId != userId) {
                const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS)
                error.status = 403
                throw error
            }
            return medicineOrder
        } catch (error) {
            throw error
        }
    }
    async updateMedicineOrderQuantity(medicineOrderId, userId, quantity) {
        try {
            const result = await sequelize.transaction(async (t) => {
                const medicineOrder = await this.medicineOrderRepo.getMedicineOrderById(medicineOrderId);
                if (!medicineOrder) {
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND)
                    error.status = 404
                    throw error
                }
                if (medicineOrder.userId != userId) {
                    const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS)
                    error.status = 403
                    throw error
                }
                const medicine = await this.medicineRepo.getMedicineById(medicineOrder.medicineId, t);
                if (!medicine) {
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_NOT_FOUND)
                    error.status = 404
                    throw error
                }
                if(quantity > medicine.stock) {
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH)
                    error.status = 500
                    throw error
                }
                const subTotal = quantity * medicine.price
                const updateData = {
                    id: medicineOrderId,
                    medicineId: medicine.id,
                    count: quantity,
                    subTotal,
                }
                await this.medicineOrderRepo.updateMedicineOrder(updateData, t);
                return updateData
            })
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteMedicineOrder(medicineOrderId, userId) {
        try {
            const affectedRows = await sequelize.transaction(async (t) => {
                const medicineOrder = await this.medicineOrderRepo.getMedicineOrderById(medicineOrderId, t);
                if (!medicineOrder) {
                    const error = new Error(ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND)
                    error.status = 404
                    throw error
                }
                if (medicineOrder.userId != userId) {
                    const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS)
                    error.status = 403
                    throw error
                }
                return await this.medicineOrderRepo.deleteMedicineOrder(medicineOrderId, t);
            })
            return affectedRows
        } catch (error) {
            throw error
        }
    }
}

module.exports = { MedicineOrderService }