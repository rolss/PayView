const express = require('express')
const {
    createUser,
    loginUser,
    newCard
} = require('../controllers/userController')

const router = express.Router()

// POST a new user
router.post('/signup', createUser)

// GET a user (use post because we're using passwords)
router.post('/login', loginUser)

// !!this is more of an admin endpoint for now
// POST a card (available to user as in to add cards to his profile maybe?)
router.post('/newCard', newCard)

module.exports = router