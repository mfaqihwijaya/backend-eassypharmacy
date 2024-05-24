const { sequelize } = require("../models/db");
const { ErrorMessage } = require("../models/response");

class MedicineOrderService {
    constructor(medicineOrderRepo, medicineRepo, userRepo, orderRepo) {
        this.medicineOrderRepo = medicineOrderRepo
        this.medicineRepo = medicineRepo
        this.userRepo = userRepo
        this.orderRepo = orderRepo
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
    async checkout(userId, medicineOrderIds) {
        try {
            // check user & medicine is exist
            const user = await this.userRepo.getUserById(userId);
            if (!user) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND);
                error.status = 404;
                throw error;
            }
            const result = await sequelize.transaction(async (t) => {
                const medicineOrders = await this.medicineOrderRepo.getMedicineOrderByIds(medicineOrderIds, t);
                const total = medicineOrders.reduce((total, medicineOrder) => total + medicineOrder.subTotal)
                const newOrderData = {
                    userId,
                    total,
                    address: user.address,
                    paidAt: new Date()
                }
                const order = await this.orderRepo.createOrder(newOrderData, t)
                medicineOrders.forEach(async (medicineOrder) => {
                    const { medicineId, count } = medicineOrder
                    if (medicineOrder.userId != userId) {
                        const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS)
                        error.status = 403
                        throw error
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
                    // update stock
                    const medicineUpdate = {
                        id: medicine.id,
                        stock: medicine.stock - count
                    }
                    await this.medicineRepo.updateMedicine(medicineUpdate, t)
                    // update medicine order
                    const medicineOrderUpdate = {
                        id: medicineOrder.id,
                        orderId: order.id
                    }
                    await this.medicineOrderRepo.updateMedicineOrder(medicineOrderUpdate, t)
                });
                return order
            })
        } catch (err) {
            throw err
        }
    }
}

module.exports = { MedicineOrderService }