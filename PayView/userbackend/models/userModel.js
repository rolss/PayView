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
        throw Error('Todos los campos deben ser completados')
    }
    if (!validator.isEmail(email)) {
        throw Error('Correo invalido')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('La contraseña no es lo suficientemente fuerte')
    }
    
    // validate if email already exists
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Este correo ya se encuentra en uso')
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
        throw Error('Todos los campos deben ser completados')
    }

    // validate if email can be found in database
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Correo electrónico incorrecto')
    }

    // compare password on input with hashed password on database
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Contraseña incorrecta')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)

