const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const cardDetails = async (req,res) => {
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

        // id added on middleware
        const id = req.user._id
        const history = await Transaction.find({user_id: id})
        balance = info.balance
        const new_history = history.map(item => ({ description: item.description, amount: item.amount }));

        if (info) {
            res.status(200).json({balance, new_history})
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
        // !!add: must receive all card info to be searched and valid
        const validCard = await Card.findOne({cardNumber: information.cardNumber})
        console.log(validCard)
        if (validCard) {
            // !!modify: change ...req.body to destructured variables
            const transaction = await Transaction.create({...req.body}) // includes a user id
            //console.log(transaction)
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'This card is not valid'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// map it on pages/view render
const getHistory = async (req,res) => {
    try {
        const id = req.user._id
        const transactions = await Transaction.find({user_id: id})
        if (transactions) {
            res.status(200).json(transactions)
        } else {
            res.status(400).json({error: 'No transactions found'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    cardDetails,
    newTransaction
}