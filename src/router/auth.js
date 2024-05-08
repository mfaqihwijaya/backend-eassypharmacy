class AuthRouter {
    constructor(app, authMiddleware, authController) {
        this.authMiddleware = authMiddleware
        this.authController = authController
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // [POST] /api/v1/auth/register
        const register = this.app.route(`${v1}/auth/register`)
        register.post(
            async (req, res, next) => {
                this.authMiddleware.validateRegisterParams(req, res, next);
            },
            async (req, res) => {
                this.authController.userRegister(req, res)
            }
        )

        // [POST] /api/v1/auth/login
        const login = this.app.route(`${v1}/auth/login`)
        login.post(
            async (req, res, next) => {
                this.authMiddleware.validateLoginParams(req, res, next);
            },
            async (req, res) => {
                this.authController.userLogin(req, res)
            }
        )
    }
}

module.exports = { AuthRouter }