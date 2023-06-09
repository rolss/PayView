const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Middleware to make sure user is logged in before continuing to any action request
const requireAuth = async (req,res,next) => {
    
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error:'Token de autorización requerido'})
    }

    const token = authorization.split(' ')[1] // Separate 'Bearer' from token
    
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        // add user at the end of the request, to be able to fetch its id. Use it like so: req.user._id
        req.user = await User.findOne({ _id }).select('_id') 
        
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Petición no autorizada'})
    }

}   

module.exports = requireAuth