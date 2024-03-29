import { useState } from "react"

const NewCard = ({user, setEastCards, setWesternCards}) => {
    // Form variables
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')
    const [bank, setBank] = useState('Western Bank')

    // Error handling
    const [error, setError] = useState(null)

    // Form validations to ensure valid transactions
    const performValidations = () => {
        if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
            setError("Please don't leave empty fields")
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            setError("Dates on card are invalid")
        }
        if (code.length !== 3) {
            setError("Invalid CVV")
        }
    }
    
    // Post new card on backend and database
    const handleSubmit = async (e) => {
        e.preventDefault()
        performValidations()
        
        // Group all variables the backend requires to log new card into database
        const details = {
            cardName, cardNumber, expMonth, expYear, code
        }
        
        // Set bank selected by user to mount up the correct url for backend
        var bank_to_fetch = ""
        if (bank === "Western Bank") {
            bank_to_fetch = "western"
        } else {
            bank_to_fetch = "east"
        }

        try {
            // Send card details. This will automatically add the card to the user list of linked cards
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
                setError('')
                if (bank === "Western Bank") {
                    setWesternCards(json.cards)
                } else {
                    setEastCards(json.cards)
                }
            }

            if (!response.ok) {
                setError(json.error)
            }
        } catch (error) {
            console.error('Error at cardInformation:', error.message)
        }
    }

    return ( 
        <form onSubmit={handleSubmit} className="form">
            <h2>New Card</h2>
            <label className="mt-2">Name on card</label>
            <input type="text" className="form-control" placeholder="Bruce Wayne"  onChange={(e) => {setCardName(e.target.value)}}/>
            <label className="mt-2">Bank</label>
            <select className="form-select" onChange={(e) => {setBank(e.target.value)}}>
                <option value="Western Bank">Western Bank</option>
                <option value="East Bank">Eastern Bank</option>
            </select>
            <label className="mt-2">Card number</label>
            <input maxLength="16" className="form-control" type="text" placeholder="xxxx xxxx xxxx xxxx" onChange={(e) => {setCardNumber(e.target.value)}}/>
            <label className="mt-2">Date of expiry</label>
            <div className="row">
                <div className="col-5 col-sm-4">
                    <input className="form-control" maxLength="2" type="text" placeholder="MM" onChange={(e) => {setExpMonth(e.target.value)}}/>
                </div>
                <div className="col-5 col-sm-4">
                    <input className="form-control" maxLength="2" type="text" placeholder="YY" onChange={(e) => {setExpYear(e.target.value)}}/>
                </div>
            </div>
            <label className="mt-2">Security code</label>
            <input maxLength="3" className="form-control w-25" type="password" placeholder="•••" onChange={(e) => {setCode(e.target.value)}}/>
            <button className="formbutton btn btn-warning mt-4 w-100">Add to view</button>

            {/* Display validation errors that may arise */}
            {error && 
            <div className="error mt-2">
                <p>{error}</p>
            </div>}
        </form>
     );
}
 
export default NewCard;