const { Model } = require("sequelize")
const { ErrorMessage } = require("./response")

class User extends Model { }

class UserRequest {
    constructor(username, email, phoneNumber, password) {
        this.username = username
        this.email = email
        this.phoneNumber = phoneNumber
        this.password = password
    }

    validate() {
        this.validateUsername()
        this.validateEmail()
        this.validatePassword()
    }

    validateUsername() {
        if (!this.username) {
            throw new Error(ErrorMessage.ERROR_INVALID_USERNAME)
        }
    }
    
    validateEmail() {
        if (!this.email) {
            throw new Error(ErrorMessage.ERROR_INVALID_EMAIL)
        }
    }

    validatePassword() {
        if (!this.password) {
            throw new Error(ErrorMessage.ERROR_INVALID_PASSWORD)
        }

        // add some validation
        // password min 8 char
        // harus ada special char
        // harus ada capital
        // etc
    }
}

module.exports = { User }