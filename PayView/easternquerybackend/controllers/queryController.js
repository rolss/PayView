const Transaction = require('../models/eastTransactionModel')
const Card = require('../models/eastCardModel')

// Finds all cards linked to the user that is performing the request. Returns list of cards or an empty string if no cards were found
const getUserCards = async (user_id) => {
    const userCards = await Card.find({ users: { $in: [user_id] } });
                
    if (userCards.length !== 0) {
        const cards = userCards.map(item => ({ _id: item._id, balance: item.balance, cardNumber: item.cardNumber.slice(-4), company: item.company, bank: item.bank }));
        return {cards}
    } else if (userCards.length === 0) {
        return {cards: ''}
    }
}

/* Find all transactions by user id, only keep the description, amount and card number of each one
Return null if user has no history */
const transactionHistory = async (req,res) => {
    const id = req.user._id

    try {
        let history = null;
        const transac_history = await Transaction.find({user_id: id}).sort({ createdAt: 'descending'})
        if (transac_history.length > 0) {
            console.log("transac: "+transac_history)
            history = transac_history.map(item => ({ _id: item._id, 
                amount: item.amount, 
                cardNumber: item.cardNumber, 
                bank: item.bank,
                createdAt: item.createdAt}));
        }

        if (history) {
            console.log(history)
            res.status(200).json({history})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Links card to user who performed request. Returns card information safely
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
                
                // Return all user cards updated
                const updatedCards = await getUserCards(user_id);
                res.status(200).json(updatedCards);
            } else {
                res.status(400).json({error: "Current user has already been linked to this card"})
            }
        }
        if (!card) {
            if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
                res.status(400).json({error: 'Please dont leave empty fields'})
            } else if (expMonth.length !== 2 || expYear.length !== 2) {
                res.status(400).json({error: 'Invalid dates'})
            } else if (code.length !== 3) {
                res.status(400).json({error: 'Invalid CVV'})
            } else {
                res.status(400).json({error: 'Invalid card credentials'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Unlinks user from a card
const deleteCard = async (req,res) =>{
    const user_id = req.user._id
    const { cardId } = req.body

    try {
        // Get all cards which have the user
        const card = await Card.findOne({ _id: cardId, users: { $in: [user_id] } });
        if (card) {
            // remove user from the list of users within that card
            await Card.updateOne({ _id: cardId }, { $pull: { users: user_id } });

            // Return all user cards updated
            const updatedCards = await getUserCards(user_id);
            res.status(200).json(updatedCards);
        }
        if (!card) {
            res.status(400).json({error: "This user is not linked to this card"})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const fetchCards = async (req,res) => {
    const user_id = req.user._id

    // Return all user cards updated
    const updatedCards = await getUserCards(user_id);
    res.status(200).json(updatedCards);
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
    deleteCard,
    checkAvailability
}