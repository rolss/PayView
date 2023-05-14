const User = require('../models/userModel')
const Card = require('../models/cardModel')
const Transaction = require('../models/transactionModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    // three arguments: payload object (nothing sensitive), secret, when user will be logged out (after 3 days)
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30d'})
}

const createUser = async (req,res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        console.log(user._id)
        const token = createToken(user._id)

        if (user) {
            res.status(200).json({email, token})
        }
        if (!user) {
            res.status(400).json({error: 'El usuario no se encuentra registrado'})
        }
        
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const cardDetails = async (req,res) => {
    try {
        const info = await Card.findOne({
            name: req.cardName,
            number: req.cardNumber,
            expMonth: req.expMonth,
            expYear: req.expYear,
            code: req.code
        })
        if (info) {
            res.status(200).json(info.balance)
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
    try {
        //const validCard = await Card.findOne({number: information.number})
        //if (validCard) {
            const transaction = await Transaction.create({...req.body}) // includes a user id
            //console.log(transaction)
            res.status(200).json(transaction)
        //}
        //if (!validCard) {
        //    res.status(400).json({error: 'This card is not valid'})
        //}
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

// BACKEND ONLY - FOR DEMOS
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
    cardDetails,
    newTransaction,
    newCard
}