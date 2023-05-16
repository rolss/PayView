const express = require('express')
const {
    transactionHistory,
    cardBalance,
    newTransaction
} = require('../controllers/actionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// GET transaction history Returns amount, description, last 3 digits of card (per transaction)
router.get('/history', transactionHistory)

// (secure GET) card information
router.post('/balance', cardBalance)

// POST a transaction
router.post('/newtransaction', newTransaction)

module.exports = router