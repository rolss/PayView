const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    name: {
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
    amount: {
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
    }
}, {timestamps: true}) 

module.exports = mongoose.model('Transaction', transactionSchema)