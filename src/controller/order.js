const { SuccessMessage, ErrorResponse, ErrorMessage, SuccessResponse, ErrorType } = require("../models/response");

class OrderController {
    constructor(orderService) {
        this.orderService = orderService
    }
    async getOrders(req, res) {
        try {
            const { userId } = req
            const orders = await this.orderService.getOrders(userId)
            const response = new SuccessResponse(SuccessMessage.ORDER_FETCHED, orders)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_ORDER_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
    async getOrderById(req, res) {
        try {
            const { userId } = req
            const { orderId } = req.params
            const order = await this.orderService.getOrderById(userId, orderId)
            const response = new SuccessResponse(SuccessMessage.ORDER_FETCHED, order)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_ORDER_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
    async updateOrderAddress(req, res) {
        try {
            const { userId } = req
            const { orderId } = req.params
            const { address } = req.body
            await this.orderService.updateOrderAddress(userId, orderId, address)
            const response = new SuccessResponse(SuccessMessage.ORDER_UPDATED, { orderId, address })
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_ORDER_UPDATE, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
    async checkout(req, res) {
        try {
            const { medicineOrderIds } = req.body
            const { userId } = req
            const response = await this.orderService.checkout(userId, medicineOrderIds)
            res.status(200).send(response)
        } catch (err) {
            const errs = [new ErrorResponse(ErrorType.ERROR_MEDICINE_ORDER_FETCH, err.message)]
            res.status(err.status? err.status: 500).send(errs)
        }
    }
}

module.exports = { OrderController }