const SuccessMessage = {
    "USER_FETCHED": "user data successfully fetched",
    "USER_UPDATED": "user data succesfully updated",
    "USER_REGISTERED": "user succesfully registered",
    "USER_LOGGED_IN": "user succesfully logged in",

    "MEDICINE_FETCHED": "medicine data successfully fetched",
    "MEDICINE_UPDATED": "medicine data succesfully updated",

    "MEDICINE_ORDER_CREATED": "medicine order data successfully created",
    "MEDICINE_ORDER_FETCHED": "medicine order data successfully fetched",
    "MEDICINE_ORDER_UPDATED": "medicine order data succesfully updated",
}

const ErrorMessage = {

    "ERROR_USER_REGISTER": "error creating user, please try again",
    "ERROR_USER_UPDATE": "error updating user, please try again",
    "ERROR_USER_FETCH": "error fetching user data, please try again",
    "ERROR_USER_EMAIL_USED": "error this email is already used",
    "ERROR_USER_USERNAME_USED": "error this username is already used",
    "ERROR_USER_NOT_FOUND": "error user not found in the system",
    "ERROR_USER_LOGIN": "error logging in user, please try again",

    "ERROR_INVALID_USERNAME": "invalid username",
    "ERROR_INVALID_EMAIL": "invalid email",
    "ERROR_INVALID_USER_ID": "invalid user id",
    "ERROR_INVALID_PASSWORD": "invalid user password",
    "ERROR_INVALID_ACCESS_TOKEN": "invalid access token",

    "ERROR_MEDICINE_CREATION": "error creating medicine, please try again",
    "ERROR_MEDICINE_UPDATE": "error updating medicine, please try again",
    "ERROR_MEDICINE_FETCH": "error fetching medicine data, please try again",
    "ERROR_MEDICINE_NOT_FOUND": "error medicine not found in system",

    "ERROR_INVALID_MEDICINE_ID": "invalid medicine id",

    "ERROR_MEDICINE_ORDER_CREATION": "error creating medicine order, please try again",
    "ERROR_MEDICINE_ORDER_UPDATE": "error updating medicine order, please try again",
    "ERROR_MEDICINE_ORDER_FETCH": "error fetching medicine order data, please try again",
    "ERROR_MEDICINE_ORDER_NOT_FOUND": "error medicine order not found in system",

    "ERROR_INVALID_MEDICINE_ORDER_ID": "invalid medicine order id",
}

class SuccessResponse {
    constructor(message, data) {
        this.message = message
        this.data = data
    }
}

class ErrorResponse {
    constructor(error, message) {
        this.error = error
        this.message = message
    }
}

module.exports = { SuccessResponse, ErrorResponse, SuccessMessage, ErrorMessage }