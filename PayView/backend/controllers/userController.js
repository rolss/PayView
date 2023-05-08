const User = require('../models/userModel')

const createUser = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.create({email, password})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email, password: password})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    createUser,
    loginUser
}