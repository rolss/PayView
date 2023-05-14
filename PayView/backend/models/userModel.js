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
    // validation
    if (!email || !password) {
        throw Error('Todos los campos deben ser completados')
    }
    if (!validator.isEmail(email)) {
        throw Error('Correo invalido')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('La contraseña no es lo suficientemente fuerte')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Este correo ya se encuentra en uso')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    // compare password given versus password obtained from the database that matched the email
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)

