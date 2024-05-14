const { ErrorMessage } = require('../models/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
                const error = new Error(ErrorMessage.ERROR_USER_EMAIL_USED)
                error.status = 500
                throw error
            }
            if (usernameExist) {
                const error = new Error(ErrorMessage.ERROR_USER_USERNAME_USED)
                error.status = 500
                throw error
            }
            const hashedPassword = await this.hashPassword(user.password)
            user.password = hashedPassword
            await this.userRepo.createUser(user)
            return user
        } catch (error) {
            throw error
        }
    }
    async userLogin(user) {
        try {
            // get user by email
            const userData = await this.userRepo.getUserByEmail(user.email)
            if (!userData) {
                const error = new Error(ErrorMessage.ERROR_USER_NOT_FOUND)
                error.status = 404
                throw error
            }
            // compare password
            const hashedPassword = userData.password
            const plainPassword = user.password
            const isMatch = await this.comparePassword(plainPassword, hashedPassword)
            if (!isMatch) {
                const error = new Error(ErrorMessage.ERROR_INVALID_PASSWORD)
                error.status = 400
                throw error
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
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
    async comparePassword(password, hashed) {
        try {
            return await bcrypt.compare(password, hashed)
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
    async createUserToken(userData) {
        try {
            // membuat claim
            // sub, iat
            const now = new Date()
            const claims = {
                sub: userData.id,
                iat: now
            }
            // membuat jwt accessToken
            const accessToken = jwt.sign(claims, this.sessionConfig.secret)
            // generate token model
            const tokens = new Token(accessToken)
            return tokens
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
    async validateUserToken(token) {
        try {
            const decoded = jwt.verify(token, this.sessionConfig.secret);
            const { sub } = decoded;
            const user = await this.userRepo.getUserById(sub)
            if(!user) {
                const error = new Error(ErrorMessage.ERROR_INVALID_ACCESS_TOKEN);
                error.status = 403;
                throw error;
            }
            return decoded
        } catch (err) {
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
}

module.exports = { AuthService }