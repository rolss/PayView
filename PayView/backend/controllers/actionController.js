const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const transactionHistory = async (req,res) => {
    const id = req.user._id // this id was added on our own middleware

    // Find all transactions by user id, only keep the description, amount and card number of each one
    const transac_history = await Transaction.find({user_id: id})
    const history = transac_history.map(item => ({ description: item.description, amount: item.amount, cardNumber: item.cardNumber }));

    if (history) {
        res.status(200).json({history})
    }
    if (!history) {
        res.status(400).json({error: 'Este usuario no ha realizado ninguna transacción'})
    }
}

const cardBalance = async (req,res) => {
    const { cardName, cardNumber, expMonth, expYear, code } = req.body
    
    try {
        // Get card with all the information.
        const info = await Card.findOne({
            cardName,
            cardNumber,
            expMonth,
            expYear,
            code
        })
        
        if (info) {
            // return only the balance on the card
            balance = info.balance 
            res.status(200).json({balance})
        }
        if (!info) {
            if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
                res.status(400).json({error: 'Falta un campo!'})
            } else {
                res.status(400).json({error: 'Tarjeta invalida: la tarjeta con estas credenciales no existe'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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
    transactionHistory,
    cardBalance,
    newTransaction,
    checkAvailability
}