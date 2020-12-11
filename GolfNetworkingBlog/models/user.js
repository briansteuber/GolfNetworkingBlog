const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('User', user)