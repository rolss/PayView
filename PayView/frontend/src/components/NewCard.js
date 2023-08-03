import { useState } from "react"

const NewCard = ({user, updateError, setEastCards, setWesternCards}) => {

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [bank, setBank] = useState('Western Bank')

    const performValidations = () => {
        if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
            updateError("Por favor no deje campos vacios")
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            updateError("Las fechas de la tarjeta son invalidas")
        }
        if (code.length !== 3) {
            updateError("El codigo ingresado es inválido")
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        performValidations()
        
        const details = {
            cardName, cardNumber, expMonth, expYear, code
        }
        
        var bank_to_fetch = ""
        if (bank === "Western Bank") {
            bank_to_fetch = "western"
        } else {
            bank_to_fetch = "east"
        }

        try {
            // Send card details. This will automatically add the card to the user cards
            const response = await fetch('/api/' + bank_to_fetch + '/query/cardInformation', {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                updateError('')
                if (bank === "Western Bank") {
                    setWesternCards(json.cards)
                } else {
                    setEastCards(json.cards)
                }
            }

            if (!response.ok) {
                updateError(json.error)
            }
        } catch (error) {
            console.error('Error at cardInformation:', error.message)
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <h2>New Card</h2>
            {/* make this a component */}
            <label className="mt-2">Name on card</label>
            <input type="text" className="form-control"  onChange={(e) => {setCardName(e.target.value)}}/>
            <label>Bank</label>
            <select className="form-select" onChange={(e) => {setBank(e.target.value)}}>
                <option value="Western Bank">Western Bank</option>
                <option value="East Bank">Eastern Bank</option>
            </select>
            <label className="mt-2">Card number</label>
            <input maxLength="16" className="form-control" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
            <label className="mt-2">Expiry code</label>
            <div className="row">
                <div className="col-md-6">
                    <input className="form-control" maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                </div>
                <div className="col-md-6">
                    <input className="form-control" maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                </div>
            </div>
            <label className="mt-2">Security code</label>
            <input maxLength="3" className="form-control" type="text" onChange={(e) => {setCode(e.target.value)}}/>
            <button className="formbutton btn btn-warning">View</button>
        </form>
     );
}
 
export default NewCard;