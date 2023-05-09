const User = require('../models/userModel')
const Card = require('../models/cardModel')
const Transaction = require('../models/transactionModel')

const createUser = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.create({email, password})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email, password: password})
        if (user) {
            res.status(200).json(user)
        }
        if (!user) {
            res.status(400).json({error: 'El usuario no se encuentra registrado'})
        }
        
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const cardInfo = async (req,res) => {
    const card_number = req.params.id

    try {
        const info = await Card.findOne({number: card_number})
        if (info) {
            res.status(200).json(info)
        }
        if (!info) {
            res.status(400).json({error: 'Esta tarjeta no pudo ser encontrada'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const makeTransaction = async (req,res) => {
    const information = req.body
    console.log(information)
    try {
        const validCard = await Card.findOne({number: information.number})
        if (validCard) {
            const transaction = await Transaction.create({...req.body})
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'This card is not valid'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const newCard = async (req,res) => {
    try {  
        const card = await Card.create({...req.body})
        res.status(200).json(card)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    createUser,
    loginUser,
    cardInfo,
    makeTransaction,
    newCard
}