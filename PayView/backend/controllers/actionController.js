const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const transactionHistory = async (req,res) => {
    // id added on middleware
    const id = req.user._id
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
        // !! missing: check if all the info has been provided and is valid
        const info = await Card.findOne({
            cardName,
            cardNumber,
            expMonth,
            expYear,
            code
        })
        
        balance = info.balance

        if (info) {
            res.status(200).json({balance})
        }
        if (!info) {
            res.status(400).json({error: 'La tarjeta con estas credenciales no pudo ser encontrada'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const newTransaction = async (req,res) => {
    const information = req.body
    console.log(information)
    try {
        user_id = req.user._id
        // !!add: must receive all card info to be searched and valid
        const validCard = await Card.findOne({cardNumber: information.cardNumber})
        console.log(validCard)
        if (validCard) {
            // !!modify: change ...req.body to destructured variables
            const transaction = await Transaction.create({...req.body, user_id}) // includes a user id
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'This card is not valid'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    transactionHistory,
    cardBalance,
    newTransaction
}