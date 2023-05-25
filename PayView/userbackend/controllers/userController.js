const User = require('../models/userModel')
const Card = require('../models/cardModel')
const jwt = require('jsonwebtoken')

// Create a JWT Token for a user which expires in 30 days.
const createToken = (_id) => {
    // three arguments: payload object (nothing sensitive), secret, timeout before logout
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

const checkAvailability = async (req,res) => {
    try {
        res.status(200).json({"status": "available"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// BACKEND ONLY - FOR DEMOS [!!]
const newCard = async (req,res) => {
    const {cardName, cardNumber, expMonth, expYear, code, balance, active, type} = req.body
    try {
        // Use regular expressions to find what type of card it is
        // Example: Master card: starts 5, followed by 1-5, followed by 14 digits. Total 16 digits
        let company = "Unknown"
        if (/^5[1-5]\d{14}$/.test(cardNumber)) {
            company = "MasterCard"
        } else if (/^4\d{12}(?:\d{3})?$/.test(cardNumber)) {
            company = "Visa"
        } else if (/^3[47]\d{13}$/.test(cardNumber)) {
            company = "American Express"
        }

        // Create a card using request body + found company + an empty users list
        const card = await Card.create({cardName, cardNumber, expMonth, expYear, code, balance, company, type, active, users: []})
        res.status(200).json(card)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    createUser,
    loginUser,
    newCard,
    checkAvailability
}