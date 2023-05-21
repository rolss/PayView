const express = require('express')
const {
    newTransaction,
    checkAvailability
} = require('../controllers/transactionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// POST a transaction
router.post('/newtransaction', newTransaction)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router