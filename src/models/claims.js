class Claims {
    constructor(sub, iss, iat, exp, aud, data) {
        this.sub = sub
        this.iss = iss
        this.iat = iat
        this.exp = exp
        this.aud = aud
        this.data = data
    }
}

class ClaimsData {
    constructor(email, username) {
        this.email = email
        this.username = username
    }
}

module.exports = { Claims, ClaimsData }