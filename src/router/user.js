class UserRouter {
    constructor(app, userController, jwtMiddleware) {
        this.userController = userController
        this.app = app
        this.jwtMiddleware = jwtMiddleware
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [GET] /api/v1/profile
        const profile = this.app.route(`${v1}/profile`)
        profile.get(
            async (req, res, next) => {
                this.jwtMiddleware.authenticate(req, res, next);
            },
            async (req, res) => {
                this.userController.getProfile(req, res)
            }
        )

    }
}

module.exports = { UserRouter }