const bcrypt = require('bcrypt')
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        return hashed
    } catch (err) {
        throw err;
    }
}

async function comparePassword(password, hashed) {
    try {
        return await bcrypt.compare(password, hashed)
    } catch (err) {
        throw err;
    }
}

module.exports = { hashPassword, comparePassword }
