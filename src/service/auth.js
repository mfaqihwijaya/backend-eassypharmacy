const { ErrorMessage } = require('../models/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Claims, ClaimsData } = require('../models/claims')
const Token = require('../models/token')
class AuthService {
    constructor(userRepo, sessionConfig) {
        this.userRepo = userRepo
        this.sessionConfig = sessionConfig
    }
    async userRegister(user) {
        try {
            const emailExist = await this.userRepo.getUserByEmail(user.email)
            const usernameExist = await this.userRepo.getUserByUsername(user.username)
            if (emailExist) {
                throw new Error(ErrorMessage.ERROR_USER_EMAIL_USED)
            }
            if (usernameExist) {
                throw new Error(ErrorMessage.ERROR_USER_USERNAME_USED)
            }
            const hashedPassword = await this.hashPassword(user.password)
            user.password = hashedPassword
            const userData = await this.userRepo.createUser(user)
            return userData
        } catch (error) {
            throw error
        }
    }
    async userLogin(user) {
        try {
            // get user by email
            const userData = await this.userRepo.getUserByEmail(user.email)
            // compare password
            const hashedPassword = userData.password
            const plainPassword = user.password
            const isMatch = await this.comparePassword(plainPassword, hashedPassword)
            if (!isMatch) {
                throw new Error(ErrorMessage.ERROR_INVALID_PASSWORD)
            }
            // generate token
            const tokens = await this.createUserToken(userData)
            return tokens
        } catch (error) {
            throw error
        }
    }
    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            return hashed
        } catch (error) {
            throw error
        }
    }
    async comparePassword(password, hashed) {
        try {
            return await bcrypt.compare(password, hashed)
        } catch (error) {
            throw error
        }
    }
    async createUserToken(userData) {
        // membuat claim
        // sub, iss, iat, exp, aud, data
        const now = new Date()
        const exp = (Date.now() / 1000) + (60 * 60 * this.sessionConfig.accessExpires)
        const claims = new Claims(
            userData.id,
            this.sessionConfig.issuer,
            now,
            exp,
            this.sessionConfig.audience,
            new ClaimsData (
                userData.email,
                userData.username
            )
        )

        const expRefresh = (Date.now() / 1000) + (60 * 60 * this.sessionConfig.refreshExpires)
        const refreshClaims = new Claims(
            userData.id,
            this.sessionConfig.issuer,
            now,
            expRefresh,
            this.sessionConfig.audience,
            new ClaimsData (
                userData.email,
                userData.username
            )
        )

        // membuat jwt accessToken dan refreshToken
        const accessToken = jwt.sign(JSON.stringify(claims), this.sessionConfig.secret)
        const refreshToken = jwt.sign(JSON.stringify(refreshClaims), this.sessionConfig.secret)

        // generate token model
        const tokens = new Token(accessToken, refreshToken)
        return tokens
    }
}

module.exports = { AuthService }