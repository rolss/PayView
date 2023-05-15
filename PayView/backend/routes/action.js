const express = require('express')
const {
    cardDetails,
    newTransaction
} = require('../controllers/actionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// GET card information
router.get('/details/:id', cardDetails)

// POST a transaction
router.post('/newtransaction', newTransaction)

module.exports = router