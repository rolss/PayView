const Transaction = require('../models/westernTransactionModel')
const Card = require('../models/westernCardModel')

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
                bank:"Western Bank", user_id}) // include id of user who is making transaction
            res.status(200).json(transaction)
        }
        if (!validCard) {
            res.status(400).json({error: 'Esta tarjeta no es valida'})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// BACKEND ONLY - FOR DEMOS [!!]
const newCard = async (req,res) => {
    const {cardName, cardNumber, expMonth, expYear, code, balance, active, type} = req.body
    try {
        // Use regular expressions to find what type of card it is
        // Example: Master card: starts 5, followed by 1-5, followed by 14 digits. Total 16 digits
        let company = "Unknown"
        if (/^5[1-5]\d{14}$/.test(cardNumber)) {
            company = "MasterCard"
        } else if (/^4\d{12}(?:\d{3})?$/.test(cardNumber)) {
            company = "Visa"
        } else if (/^3[47]\d{13}$/.test(cardNumber)) {
            company = "American Express"
        }

        // Create a card using request body + found company + an empty users list
        const card = await Card.create({cardName, cardNumber, expMonth, expYear, code, balance, company, type, active, bank: "Western Bank", users: []})
        res.status(200).json(card)
        
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
    newCard,
    checkAvailability
}