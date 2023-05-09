const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    idType: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    installments: {
        type: Number,
        required: true
    },
}, {timestamps: true}) 

module.exports = mongoose.model('Transaction', transactionSchema)