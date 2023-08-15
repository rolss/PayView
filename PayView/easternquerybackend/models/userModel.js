const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 

userSchema.statics.signup = async function(email, password) {
    // validate for missing fields, invalid email and password strength
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is too weak, please add numbers, capital latters and/or special characters')
    }
    
    // validate if email already exists
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('This email is already in use')
    }

    // Add random data to password and hash it
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Add user to database with hashed password
    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    // validate for missing fields
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // validate if email can be found in database
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email or password')
    }

    // compare password on input with hashed password on database
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect email or password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)

