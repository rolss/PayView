const express = require('express')
const {
    createUser,
    loginUser,
    cardDetails,
    newTransaction,
    newCard
} = require('../controllers/userController')

const router = express.Router()

// POST a new user
router.post('/signup', createUser)

// GET a user (use post because we're using passwords)
router.post('/login', loginUser)

// GET card information
router.get('/details/:id', cardDetails)

// POST a transaction
router.post('/newtransaction', newTransaction)

// POST a card (available to user as in to add cards to his profile maybe?)
router.post('/newCard', newCard)

module.exports = router