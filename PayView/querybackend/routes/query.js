const express = require('express')
const {
    transactionHistory,
    cardBalance,
    checkAvailability
} = require('../controllers/queryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// GET transaction history Returns amount, description, last 3 digits of card (per transaction)
router.get('/history', transactionHistory)

// (secure GET) card information
router.post('/balance', cardBalance)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router