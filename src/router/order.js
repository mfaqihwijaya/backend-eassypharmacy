class OrderRouter {
    constructor(app, jwtMiddleware, orderController) {
        this.jwtMiddleware = jwtMiddleware
        this.orderController = orderController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/orders 
        const orders = this.app.route(`${v1}/orders`)
        orders.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.orderController.getOrders(req, res)
            }
        )
        orders.post(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.orderController.checkout(req, res)
            }
        )   

        // [GET] /api/v1/orders/:orderId
        const orderId = this.app.route(`${v1}/orders/:orderId`)
        orderId.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.orderController.getOrderById(req, res)
            }
        )
        orderId.put(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.orderController.updateOrderAddress(req, res)
            }
        )

        const cancelOrder = this.app.route(`${v1}/orders/:orderId/cancel`)
        cancelOrder.put(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.orderController.cancelOrder(req, res)
            }
        )
    }
}

module.exports = { OrderRouter }