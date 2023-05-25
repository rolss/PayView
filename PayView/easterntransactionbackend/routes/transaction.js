const express = require('express')
const {
    newTransaction,
    newCard,
    checkAvailability
} = require('../controllers/transactionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// POST a transaction
router.post('/newtransaction', newTransaction)

// POST a new East Bank card
router.post('/newCard', newCard)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router