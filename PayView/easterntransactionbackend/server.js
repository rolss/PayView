// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const actionRoutes = require('./routes/transaction')

// middleware
app.use(express.json()) 
app.use((req,res,next) => { 
    console.log(req.path, req.method) 
    next()
})

// routes
app.use('/api/east/transaction', actionRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port 4002')
        })
    })
    .catch((error) => {
        console.log(error)
    })




// app.get('/', (req,res) => { // test
//     res.json({mssg: 'Bienvenido'})
// })