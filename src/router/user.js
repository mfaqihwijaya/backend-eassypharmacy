const { validateJWT } = require('../middlewares/jwt')
class UserRouter {
    constructor(app, userController) {
        this.userController = userController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [POST] /api/v1/users 
        const users = this.app.route(`${v1}/users`)
        users.post(validateJWT,async (req, res) => {
            this.userController.createUser(req, res)
        })

        // [GET] /api/v1/users/:userId
        const userId = this.app.route(`${v1}/users/:userId`)
        userId.get(validateJWT, async (req, res) => {
            this.userController.getUserById(req, res)
        })

    }
}

module.exports = { UserRouter }