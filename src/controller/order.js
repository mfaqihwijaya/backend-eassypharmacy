const {
    SuccessMessage,
    ErrorResponse,
    ErrorMessage,
    SuccessResponse,
    ErrorType,
} = require('../models/response');
const { RESPONSE_STATUS_CODE } = require('../util/constants');

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrders(req, res) {
        try {
            const { userId } = req;
            const orders = await this.orderService.getOrders(userId);
            const response = new SuccessResponse(
                SuccessMessage.ORDER_FETCHED,
                orders
            );
            res.status(RESPONSE_STATUS_CODE.OK).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_ORDER_FETCH, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
    async getOrderById(req, res) {
        try {
            const { userId } = req;
            const { orderId } = req.params;
            const order = await this.orderService.getOrderById(userId, orderId);
            const response = new SuccessResponse(
                SuccessMessage.ORDER_FETCHED,
                order
            );
            res.status(RESPONSE_STATUS_CODE.OK).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_ORDER_FETCH, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
    async updateOrderAddress(req, res) {
        try {
            const { userId } = req;
            const { orderId } = req.params;
            const { address } = req.body;
            const affectedRows = await this.orderService.updateOrderAddress(
                userId,
                orderId,
                address
            );
            const response = new SuccessResponse(SuccessMessage.ORDER_UPDATED, {
                affectedRows,
            });
            res.status(RESPONSE_STATUS_CODE.OK).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_ORDER_UPDATE, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
    async checkout(req, res) {
        try {
            const { medicineOrderIds } = req.body;
            const { userId } = req;
            const newOrder = await this.orderService.checkout(
                userId,
                medicineOrderIds
            );
            const response = new SuccessResponse(
                SuccessMessage.ORDER_CHECKED_OUT,
                newOrder
            );
            res.status(RESPONSE_STATUS_CODE.CREATED).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_ORDER_CHECKOUT, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
    async cancelOrder(req, res) {
        try {
            const { orderId } = req.params;
            const { userId } = req;
            const cancelledOrder = await this.orderService.cancelOrder(
                orderId,
                userId
            );
            const response = new SuccessResponse(
                SuccessMessage.ORDER_CANCELLED,
                cancelledOrder
            );
            res.status(RESPONSE_STATUS_CODE.OK).send(response);
        } catch (err) {
            const errs = [
                new ErrorResponse(ErrorType.ERROR_ORDER_CANCEL, err.message),
            ];
            res.status(
                err.status
                    ? err.status
                    : RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR
            ).send(errs);
        }
    }
}

module.exports = { OrderController };
