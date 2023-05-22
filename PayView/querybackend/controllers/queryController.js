const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const transactionHistory = async (req,res) => {
    const id = req.user._id // this id was added on our own middleware

    // Find all transactions by user id, only keep the description, amount and card number of each one
    const transac_history = await Transaction.find({user_id: id})
    const history = transac_history.map(item => ({ _id: item._id, description: item.description, amount: item.amount, cardNumber: item.cardNumber }));

    if (history) {
        res.status(200).json({history})
    }
    if (!history) {
        res.status(400).json({error: 'Este usuario no ha realizado ninguna transacción'})
    }
}

const cardInformation = async (req,res) => {
    const { cardName, cardNumber, expMonth, expYear, code } = req.body
    const user_id = req.user._id
    
    try {
        // Get card with all the information.
        const card = await Card.findOne({
            cardName,
            cardNumber,
            expMonth,
            expYear,
            code
        })

        
        if (card) {
            // Find if user is already in this card
            const userFound = await Card.findOne({ cardNumber, users: { $in: [user_id] } });
            // If user is not in card, add user to card
            if (!userFound) {
                card.users.push(user_id)
                await card.save()
                res.status(200).json({message: "Se ha vinculado a este usuario con la tarjeta!"})
            } else {
                res.status(200).json({message: "Este usuario ya esta vinculado con esta tarjeta"})
            }
        }
        if (!card) {
            if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
                res.status(400).json({error: 'Hay un campo vacio!'})
            } else if (expMonth.length !== 2 || expYear.length !== 2) {
                res.status(400).json({error: 'Fechas de la tarjeta invalidas'})
            } else if (code.length !== 3) {
                res.status(400).json({error: 'Código invalido'})
            } else {
                res.status(400).json({error: 'Tarjeta invalida: la tarjeta con estas credenciales no existe'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const fetchCards = async (req,res) => {
    const user_id = req.user._id
    try {
        // Get all cards which have the user
        const userCards = await Card.find({ users: { $in: [user_id] } });
        
        if (userCards.length !== 0) {
            const cards = userCards.map(item => ({ _id: item._id, balance: item.balance, cardNumber: item.cardNumber, company: item.company }));
            res.status(200).json({cards})
        }

        // !! come back: check for validations (no cardS)
        
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
    cardInformation,
    fetchCards,
    checkAvailability
}