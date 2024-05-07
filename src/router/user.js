class UserRouter {
    constructor(app, userController) {
        this.userController = userController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/users/:userId
        const userId = this.app.route(`${v1}/users/:userId`)
        userId.get(async (req, res) => {
            this.userController.getUserById(req, res)
        })

    }
}

module.exports = { UserRouter }