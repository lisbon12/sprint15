const mongoose = require('mongoose')

const adminsScheema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model('admin', adminsScheema)