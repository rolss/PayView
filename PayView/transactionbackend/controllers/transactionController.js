const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const newTransaction = async (req,res) => {
    const {name, idType, idNumber, 
        description, location, amount, 
        paymentType, installments, cardName, 
        cardNumber, expMonth, expYear, code} = req.body
    const user_id = req.user._id

    try {
        // VALIDATIONS !! put them in a function to improve code readability
        if (amount <= 0) {
            res.status(400).json({error: 'Monto invalido'})
            return
        } 
        if (!name || !idNumber || !description || !location || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            res.status(400).json({error: 'Por favor llene todos los campos'})
            return
        }
        if ((idType==="cedula de ciudadania" || idType==="cedula de extranjeria") && idNumber.length !== 10) {
            res.status(400).json({error: 'Cédula invalida'})
            return
        }
        if (idType==="pasaporte" && idNumber.length !== 8) {
            res.status(400).json({error: 'Pasaporte invalido'})
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            res.status(400).json({error: 'Las fechas de la tarjeta son invalidas. Por favor use solo dos digitos.'})
            setError("Las fechas de la tarjeta son invalidas")
            setStatus('Transacción Fallida')
            return
        }
        if (code.length !== 3) {
            res.status(400).json({error: 'El código ingresado es invalido, recuerde que son los 3 digitos en la parte trasera de su tarjeta.'})
            return
        }

        //!!add: atomicity

        // Update balance based on amount. First checks if card can be found (valid).
        
        // !! add: validation amount <= balance
        const validCard = await Card.findOneAndUpdate(
            {cardName, cardNumber, expMonth, expYear, code}, 
            { $inc: { balance: -amount } }, 
            {new: true}
            )
            
            if (validCard) {
                // if user not in card, add user to card
                const userFound = await Card.findOne({ cardNumber, users: { $in: [user_id] } });
                if (!userFound) {
                    validCard.users.push(user_id)
                    await validCard.save()
                }

                const transaction = await Transaction.create(
                    {name, idType, idNumber, 
                    description, location, amount, 
                    paymentType, installments, cardNumber, 
                    user_id}) // include id of user who is making transaction
                res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'Esta tarjeta no es valida'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const checkAvailability = async (req,res) => {
    try {
        res.status(200).json({"status": "available"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    newTransaction,
    checkAvailability
}