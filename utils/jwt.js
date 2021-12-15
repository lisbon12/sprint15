const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const secret = 'dflgjhsldsadiasjpdoasjdpo'

const getJwtToken = (id) => {
    return jwt.sign({ id }, secret)
}

const isAuthorized = (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
        if(err) return false

        return Admin.findOne({_id: decoded.id})
            .then(admin => {
                return Boolean(admin)
            })
    })
}

module.exports = {
    getJwtToken,
    isAuthorized
}