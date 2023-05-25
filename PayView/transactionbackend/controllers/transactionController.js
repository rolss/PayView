const Transaction = require('../models/transactionModel')
const Card = require('../models/cardModel')

const newTransaction = async (req,res) => {
    const {name, idType, idNumber, 
        description, location, amount, installments, cardName, 
        cardNumber, expMonth, expYear, code} = req.body
    const user_id = req.user._id

    try {
        // VALIDATIONS !! put them in a function to improve code readability
        if (amount <= 0) {
            res.status(400).json({error: 'Debe ingresar un monto distinto de 0'})
            return
        } 
        if (!name || !idNumber || !description || !location || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            res.status(400).json({error: 'Por favor llene todos los campos'})
            return
        }
        if ((idType==="Cédula de Ciudadanía" || idType==="Cédula de Extranjería") && idNumber.length !== 10) {
            res.status(400).json({error: 'Cédula invalida'})
            return
        }
        if (idType==="Pasaporte" && idNumber.length !== 8) {
            res.status(400).json({error: 'Pasaporte inválido'})
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            res.status(400).json({error: 'Las fechas de la tarjeta son invalidas. Por favor use solo dos digitos.'})
            setError("Las fechas de la tarjeta son invalidas")
            setStatus('Transacción Fallida')
            return
        }
        if (code.length !== 3) {
            res.status(400).json({error: 'El código ingresado es invalido'})
            return
        }

        //!!add: atomicity

        

        
        const validCard = await Card.findOne(
            {cardName, cardNumber, expMonth, expYear, code}
        )
        
        if (validCard) {

            // Dont continue if there isn't enough money in the card, for the amount stated
            if (amount > validCard.balance){
                res.status(400).json({error: 'La tarjeta no tiene suficiente saldo para realizar esta transacción'})
                return
            }

            // Don't continue if card isn't active
            if (!validCard.active) {
                res.status(400).json({error: 'La tarjeta que intenta utilizar no se encuentra activa'})
                return
            }

            // Don't continue if card is not a credit card (but a debit card)
            if (validCard.type === "Tarjeta de Débito") {
                res.status(400).json({error: 'La tarjeta que ingresó es de tipo débito. Por favor seleccione la opción Tarjeta de débito para pagar con este tipo de tarjeta.'})
                return
            }

            // Update balance
            await Card.findOneAndUpdate(
                {cardName, cardNumber, expMonth, expYear, code}, 
                { $inc: { balance: -amount } }, 
                {new: true}
                )

            // if user not in card, add user to card
            const userFound = await Card.findOne({ cardNumber, users: { $in: [user_id] } });
            if (!userFound) {
                validCard.users.push(user_id)
                await validCard.save()
            }

            const sliced_number = cardNumber.slice(-4)
            // !! change: only send back last three digits of card
            const transaction = await Transaction.create(
                {name, idType, idNumber, 
                description, location, amount,
                installments, cardNumber: sliced_number, 
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