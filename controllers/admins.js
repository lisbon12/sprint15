const Admin = require('../models/admin')

const bcrypt = require('bcrypt')
const { getJwtToken } = require('../utils/jwt')



const reqisterAdmin = (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).send({ message: "both fields shouldn't be empty"})
    }

    bcrypt.hash(password, 10, (err, hash) => {

        return Admin.findOne({ email })
            .then(admin => {
                if(admin) {
                    return res.status(409).send({ message: "such user is in database"})
                }

                return Admin.create({ email, password: hash })
                    .then(user => {
                        res.status(201).send({ user })
                    })
                    .catch(err => res.status(400).send({ message: "check data"}))
            })
            .catch(err => res.status(500).send({ err}))
    })
}

const authAdmin = (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).send({ message: "both fields shouldn't be empty"})
    }

    Admin.findOne({email})
        .then(admin => {
            if(!admin) {
                return res.status(400).send({ message: "such user is not in database"})
            }

            bcrypt.compare(password, admin.password, (err, isValid) => {
                if(!isValid) {
                    return res.status(400).send({ message: "email or password is incorrect"})
                }

                const token = getJwtToken(admin.id)
                return res.status(200).send({ token })
            })
        })
        .catch(err => res.status(500).send({ err}))
}

module.exports = {reqisterAdmin, authAdmin}