const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
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
    CVV: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
}) 

module.exports = mongoose.model('Card', cardSchema)