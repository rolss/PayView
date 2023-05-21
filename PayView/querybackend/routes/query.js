const express = require('express')
const {
    transactionHistory,
    cardInformation,
    fetchCards,
    checkAvailability
} = require('../controllers/queryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// GET transaction history Returns amount, description, last 3 digits of card (per transaction)
router.get('/history', transactionHistory)

// (secure GET) card information
router.post('/cardInformation', cardInformation)

// GET user cards
router.get('/fetchCards', fetchCards)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router