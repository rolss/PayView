const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const newTransaction = async (req,res) => {
    const {cardName, cardNumber, expMonth, expYear, code} = req.body
    user_id = req.user._id
    amount_paid = req.body.amount
    console.log(req.body.idType)
    try {
        // !!add: more validations
        if (amount_paid <= 0) {
            res.status(400).json({error: 'Monto invalido'})
            return // is this okay?
        } 

        // if card can be found, its valid. Update balance based on amount
        const validCard = await Card.findOneAndUpdate(
            {cardName, cardNumber, expMonth, expYear, code}, 
            { $inc: { balance: -amount_paid } }, 
            {new: true}
        )
        if (validCard) {
            // !!modify: change ...req.body to destructured variables
            const transaction = await Transaction.create({...req.body, user_id}) // include id of user who is making transaction
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'Esta tarjeta no es valida'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const checkAvailability = async (req,res) => {
    try {
        res.status(200).json({"status": "available"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    newTransaction,
    checkAvailability
}