const express = require('express')
const {
    createUser,
    loginUser
} = require('../controllers/userController')

const router = express.Router()

// POST a new user
router.post('/signup', createUser)

// GET a user
router.get('/login', loginUser)

module.exports = router