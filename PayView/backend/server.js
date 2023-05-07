// Entry file. Here we register express app.

// imports
require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const app = express() // express app

// middleware
app.use(express.json()) // MUY importante nunca olvidar
app.use((req,res,next) => { // next is to move to next middleware
    console.log(req.path, req.method) // register requests
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })




// app.get('/', (req,res) => { // test
//     res.json({mssg: 'Bienvenido'})
// })