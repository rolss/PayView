const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// We dont want to give the user all the information unless he's logged in
const requireAuth = async (req,res,next) => {
    
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    
    try {

        const {_id} = jwt.verify(token, process.env.SECRET)

        // add user at the end of the request, to be able to fetch its id
        req.user = await User.findOne({ _id }).select('_id') // ATTACH USER ID TO A USER. LIKE SO: user: soadjiowefu3248u123djos
        
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }

}   

module.exports = requireAuth