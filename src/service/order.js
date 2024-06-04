const { sequelize } = require('../models/db');
const { ErrorMessage } = require('../models/response');
const { ORDER_STATUS, RESPONSE_STATUS_CODE } = require('../util/constants');

class OrderService {
    constructor(orderRepo, userRepo, medicineOrderRepo, medicineRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.medicineOrderRepo = medicineOrderRepo;
        this.medicineRepo = medicineRepo;
    }
    async getOrders(userId) {
        try {
            const orders = await this.orderRepo.getOrders(userId);
            return orders;
        } catch (error) {
            throw error;
        }
    }
    async getOrderById(userId, orderId) {
        try {
            const order = await this.orderRepo.getOrderById(orderId);
            if (!order) {
                const error = new Error(ErrorMessage.ERROR_ORDER_NOT_FOUND);
                error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                throw error;
            }
            if (order.userId != userId) {
                const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS);
                error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                throw error;
            }
            return order;
        } catch (error) {
            throw error;
        }
    }
    async updateOrderAddress(userId, orderId, address) {
        try {
            const affectedRows = await sequelize.transaction(async (t) => {
                // check order is exist waiting & match user
                const order = await this.orderRepo.getOrderById(orderId);
                if (!order) {
                    const error = new Error(ErrorMessage.ERROR_ORDER_NOT_FOUND);
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                if (order.status != ORDER_STATUS.WAITING) {
                    const error = new Error(
                        ErrorMessage.ERROR_ORDER_NOT_WAITING
                    );
                    error.status = RESPONSE_STATUS_CODE.BAD_REQUEST;
                    throw error;
                }
                if (order.userId != userId) {
                    const error = new Error(
                        ErrorMessage.ERROR_RESTRICTED_ACCESS
                    );
                    error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                    throw error;
                }
                const updateData = {
                    address,
                };
                return await this.orderRepo.updateOrder(orderId, updateData);
            });
            return affectedRows;
        } catch (error) {
            throw error;
        }
    }
    async cancelOrder(orderId, userId) {
        try {
            const cancelledOrder = await sequelize.transaction(async (t) => {
                // check order is exist waiting & match user
                const order = await this.orderRepo.getOrderById(orderId, t);
                if (!order) {
                    const error = new Error(ErrorMessage.ERROR_ORDER_NOT_FOUND);
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                if (order.status != ORDER_STATUS.WAITING) {
                    const error = new Error(
                        ErrorMessage.ERROR_ORDER_NOT_WAITING
                    );
                    error.status = RESPONSE_STATUS_CODE.BAD_REQUEST;
                    throw error;
                }
                if (order.userId != userId) {
                    const error = new Error(
                        ErrorMessage.ERROR_RESTRICTED_ACCESS
                    );
                    error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                    throw error;
                }
                // restore medicine stock based on corresponding order
                const medicineOrders =
                    await this.medicineOrderRepo.getMedicineOrderByOrderId(
                        orderId,
                        t
                    );
                for (const medicineOrder of medicineOrders) {
                    const { medicineId, count } = medicineOrder;
                    const medicine = await this.medicineRepo.getMedicineById(
                        medicineId,
                        t
                    );
                    if (!medicine) {
                        const error = new Error(
                            ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                        );
                        error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                        throw error;
                    }
                    const restoreMedicineStock = {
                        id: medicineId,
                        stock: medicine.stock + count,
                    };
                    await this.medicineRepo.updateMedicine(
                        restoreMedicineStock,
                        t
                    );
                }
                // cancel order
                const cancelOrderData = {
                    status: ORDER_STATUS.CANCELLED,
                };
                await this.orderRepo.updateOrder(orderId, cancelOrderData, t);
                return { id: orderId, ...cancelOrderData };
            });
            return cancelledOrder;
        } catch (error) {
            throw error;
        }
    }
    async checkout(userId, medicineOrderIds) {
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await this.userRepo.getUserById(userId, t);
                const medicineOrders =
                    await this.medicineOrderRepo.getMedicineOrderByIds(
                        medicineOrderIds,
                        t
                    );
                if (medicineOrders.length != medicineOrderIds.length) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                    );
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                const total = await medicineOrders.reduce(
                    (total, medicineOrder) => total + medicineOrder.subTotal,
                    0
                );
                const newOrderData = {
                    userId,
                    total,
                    address: user.address,
                };
                const order = await this.orderRepo.createOrder(newOrderData, t);
                for (const medicineOrder of medicineOrders) {
                    const { medicineId, count } = medicineOrder;

                    if (medicineOrder.userId !== userId) {
                        const error = new Error(
                            ErrorMessage.ERROR_RESTRICTED_ACCESS
                        );
                        error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                        throw error;
                    }
                    // Check if medicine exists
                    const medicine = await this.medicineRepo.getMedicineById(
                        medicineId,
                        t
                    );
                    if (!medicine) {
                        const error = new Error(
                            ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                        );
                        error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                        throw error;
                    }

                    // Check medicine stock
                    if (count > medicine.stock) {
                        const error = new Error(
                            ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                        );
                        error.status = RESPONSE_STATUS_CODE.BAD_REQUEST;
                        throw error;
                    }

                    // Update medicine stock
                    const medicineUpdate = {
                        id: medicine.id,
                        stock: medicine.stock - count,
                    };
                    await this.medicineRepo.updateMedicine(medicineUpdate, t);

                    // Update medicine order
                    const medicineOrderUpdate = {
                        id: medicineOrder.id,
                        orderId: order.id,
                    };
                    await this.medicineOrderRepo.updateMedicineOrder(
                        medicineOrderUpdate,
                        t
                    );
                }

                // Return the created order
                return order;
            });
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { OrderService };
