// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const userRoutes = require('./routes/user')
const actionRoutes = require('./routes/action')

// middleware
app.use(express.json()) 
app.use((req,res,next) => { 
    console.log(req.path, req.method) 
    next()
})

// routes
// !! Eventually separate here for microservices
app.use('/api/user', userRoutes)
app.use('/api/action', actionRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
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