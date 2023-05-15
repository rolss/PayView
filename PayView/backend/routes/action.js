const express = require('express')
const {
    cardDetails,
    newTransaction
} = require('../controllers/actionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// secure GET card information
router.post('/details', cardDetails)

// POST a transaction
router.post('/newtransaction', newTransaction)

module.exports = router