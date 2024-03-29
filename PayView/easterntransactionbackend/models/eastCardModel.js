const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eastCardSchema = new Schema({
    cardName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true
    },
    expMonth: {
        type: String,
        required: true,
    },
    expYear: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    }
}) 

module.exports = mongoose.model('EastCard', eastCardSchema)