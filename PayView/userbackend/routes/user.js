const express = require('express')
const {
    createUser,
    loginUser,
    checkAvailability
} = require('../controllers/userController')

const router = express.Router()

// POST a new user
router.post('/signup', createUser)

// (secure GET) a user
router.post('/login', loginUser)

// GET server availability
router.get('/checkAvailability', checkAvailability)

module.exports = router