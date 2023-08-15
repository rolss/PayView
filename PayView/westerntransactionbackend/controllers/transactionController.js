const Transaction = require('../models/westernTransactionModel')
const Card = require('../models/westernCardModel')

const newTransaction = async (req,res) => {
    const {name, idType, idNumber, email, amount, cardName, 
        cardNumber, expMonth, expYear, code} = req.body
    const user_id = req.user._id

    try {
        // VALIDATIONS !!put in function
        if (amount <= 0) {
            res.status(400).json({error: 'Invalid amount'})
            return
        } 
        if (!name || !idNumber || !email || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            res.status(400).json({error: 'Please do not leave empty fields'})
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            res.status(400).json({error: 'Invalid expiry dates'})
            return
        }
        if (code.length !== 3) {
            res.status(400).json({error: 'Invalid code'})
            return
        }

        //!!add: atomicity
        const validCard = await Card.findOne(
            {cardName, cardNumber, expMonth, expYear, code}
        )
        
        if (validCard) {

            // Dont continue if there isn't enough money in the card, for the amount stated
            if (amount > validCard.balance){
                res.status(400).json({error: 'Insufficient funds'})
                return
            }

            // Update balance
            await Card.findOneAndUpdate(
                {cardName, cardNumber, expMonth, expYear, code}, 
                { $inc: { balance: -amount } }, 
                {new: true}
                )

            // if user not in card, add user to card
            const userFound = await Card.findOne({ cardNumber, users: { $in: [user_id] } });
            if (!userFound) {
                validCard.users.push(user_id)
                await validCard.save()
            }

            const sliced_number = cardNumber.slice(-4)
            // Only sending last 4 digits of card for security purposes
            const transaction = await Transaction.create(
                {name, idType, idNumber, 
                email, amount, cardNumber: sliced_number, 
                bank:"East Bank", user_id}) // include id of user who is making transaction
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'Esta tarjeta no es valida'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// BACKEND ONLY - FOR DEMOS [!!]
const newCard = async (req,res) => {
    const {cardName, cardNumber, expMonth, expYear, code, balance} = req.body
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

        if (company === "Unknown") {
            res.status(400).json({error: 'Invalid card. Not Visa, MasterCard or American Express'})
            return
        }

        // Create a card using request body + found company + an empty users list
        const card = await Card.create({cardName, cardNumber, expMonth, expYear, code, balance, company, bank: "Western Bank", users: []})
        res.status(200).json(card)
        
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
    newCard,
    checkAvailability
}