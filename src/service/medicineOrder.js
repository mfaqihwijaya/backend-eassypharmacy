const { sequelize } = require('../models/db');
const { ErrorMessage } = require('../models/response');
const { RESPONSE_STATUS_CODE } = require('../util/constants');

class MedicineOrderService {
    constructor(medicineOrderRepo, medicineRepo, userRepo) {
        this.medicineOrderRepo = medicineOrderRepo;
        this.medicineRepo = medicineRepo;
        this.userRepo = userRepo;
    }

    async createMedicineOrder(medicineOrder) {
        try {
            const { userId, medicineId, count } = medicineOrder;
            const result = await sequelize.transaction(async (t) => {
                // check user & medicine is exist
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
                const isMedicineAlreadyInCart =
                    await this.checkMedicineAlreadyInCart(userId, medicineId);
                if (isMedicineAlreadyInCart) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_ORDER_ALREADY_EXIST
                    );
                    error.status = RESPONSE_STATUS_CODE.CONFLICT;
                    throw error;
                }
                // check medicine stock
                if (count > medicine.stock) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                    );
                    error.status = RESPONSE_STATUS_CODE.BAD_REQUEST;
                    throw error;
                }
                const subTotal = count * medicine.price;
                const newMedicineOrder = {
                    ...medicineOrder,
                    subTotal,
                };
                await this.medicineOrderRepo.createMedicineOrder(
                    newMedicineOrder,
                    t
                );
                return newMedicineOrder;
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrders(userId) {
        try {
            const medicineOrders =
                await this.medicineOrderRepo.getMedicineOrders(userId);
            return medicineOrders;
        } catch (error) {
            throw error;
        }
    }

    async getMedicineOrderById(medicineOrderId, userId) {
        try {
            const medicineOrder =
                await this.medicineOrderRepo.getMedicineOrderById(
                    medicineOrderId
                );
            if (!medicineOrder) {
                const error = new Error(
                    ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                );
                error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                throw error;
            }
            if (medicineOrder.userId != userId) {
                const error = new Error(ErrorMessage.ERROR_RESTRICTED_ACCESS);
                error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                throw error;
            }
            return medicineOrder;
        } catch (error) {
            throw error;
        }
    }

    async checkMedicineAlreadyInCart(userId, medicineId) {
        try {
            const medicineOrder =
                await this.medicineOrderRepo.getMedicineOrderByMedicineId(
                    userId,
                    medicineId
                );
            if (!medicineOrder) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
    async updateMedicineOrderQuantity(medicineOrderId, userId, quantity) {
        try {
            const result = await sequelize.transaction(async (t) => {
                const medicineOrder =
                    await this.medicineOrderRepo.getMedicineOrderById(
                        medicineOrderId
                    );
                if (!medicineOrder) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                    );
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                if (medicineOrder.userId != userId) {
                    const error = new Error(
                        ErrorMessage.ERROR_RESTRICTED_ACCESS
                    );
                    error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                    throw error;
                }
                const medicine = await this.medicineRepo.getMedicineById(
                    medicineOrder.medicineId,
                    t
                );
                if (!medicine) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_NOT_FOUND
                    );
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                if (quantity > medicine.stock) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_NOT_ENOUGH
                    );
                    error.status = RESPONSE_STATUS_CODE.BAD_REQUEST;
                    throw error;
                }
                const subTotal = quantity * medicine.price;
                const updateData = {
                    id: medicineOrderId,
                    medicineId: medicine.id,
                    count: quantity,
                    subTotal,
                };
                await this.medicineOrderRepo.updateMedicineOrder(updateData, t);
                return updateData;
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
    async deleteMedicineOrder(medicineOrderId, userId) {
        try {
            const affectedRows = await sequelize.transaction(async (t) => {
                const medicineOrder =
                    await this.medicineOrderRepo.getMedicineOrderById(
                        medicineOrderId,
                        t
                    );
                // check is exist & never been checkouted
                if (
                    !medicineOrder ||
                    medicineOrder.orderId != null ||
                    medicineOrder.deletedAt != null
                ) {
                    const error = new Error(
                        ErrorMessage.ERROR_MEDICINE_ORDER_NOT_FOUND
                    );
                    error.status = RESPONSE_STATUS_CODE.NOT_FOUND;
                    throw error;
                }
                if (medicineOrder.userId != userId) {
                    const error = new Error(
                        ErrorMessage.ERROR_RESTRICTED_ACCESS
                    );
                    error.status = RESPONSE_STATUS_CODE.FORBIDDEN;
                    throw error;
                }
                return await this.medicineOrderRepo.deleteMedicineOrder(
                    medicineOrderId,
                    t
                );
            });
            return affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { MedicineOrderService };
