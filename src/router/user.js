class UserRouter {
    constructor(app, authMiddleware, userController) {
        this.userController = userController
        this.authMiddleware = authMiddleware
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/users/:userId
        const userId = this.app.route(`${v1}/users/:userId`)
        userId.get(
        async (req, res, next) => {
            this.authMiddleware.authenticate(req, res, next)
        }, 
        async (req, res) => {
            this.userController.getUserById(req, res)
        })

    }
}

module.exports = { UserRouter }