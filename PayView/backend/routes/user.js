const express = require('express')
const {
    createUser,
    loginUser,
    newCard,
    checkAvailability
} = require('../controllers/userController')

const router = express.Router()

// POST a new user
router.post('/signup', createUser)

// (secure GET) a user
router.post('/login', loginUser)

// !!this is more of an admin endpoint for now
router.post('/newCard', newCard)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router