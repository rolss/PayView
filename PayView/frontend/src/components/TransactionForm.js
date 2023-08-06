import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import TransactionDetails from "./TransactionDetails"

const TransactionForm = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [idType, setIdType] = useState('National ID')
    const [idNumber, setIdNumber] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState(0)
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')
    const [bank, setBank] = useState('Western Bank')

    const [status, setStatus] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState('')

    const [eastAvailable, setEastAvailable] = useState(true)
    const [westernAvailable, setWesternAvailable] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }
        
        // Group all variables the backend requires to log transaction into database
        const transaction = {
            name, idType, idNumber, 
            email, amount, cardName, 
            cardNumber, expMonth, expYear, code
        }

        var bank_to_fetch=""
        if (bank === "Western Bank") {
            bank_to_fetch = "western"
        } else {
            bank_to_fetch = "east"
        }

        // Send request to backend to post transaction, using token from context
        const response = await fetch('/api/' + bank_to_fetch + '/transaction/newtransaction', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setStatus(false)
            setError(json.error)
        }
        
        if (response.ok) {
            setStatus(true)
            setError('')
        }

        setData({...json, status})
        console.log(data)

    }
    
    useEffect(() => {
        const checkEastAvailability = async () => {
            try {
                const response = await fetch('api/east/transaction/checkAvailability', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    setEastAvailable(true)
                }
                if (!response.ok) {
                    setEastAvailable(false)
                }
            } catch (error) {
                setEastAvailable(false)
                console.error('Error:', error.message)
            }
        }
        const checkWesternAvailability = async () => {
            try {
                const response = await fetch('api/western/transaction/checkAvailability', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    setWesternAvailable(true)
                }
                if (!response.ok) {
                    setWesternAvailable(false)
                }
            } catch (error) {
                setEastAvailable(false)
                console.error('Error:', error.message)
            }
        }

        checkEastAvailability()
        checkWesternAvailability()
    }, [user.token])

    const validate = () => {
        if (amount <= 0) {
            setError("Invalid amount")
            setStatus(false)
            return false
        }
        if (!name || !idNumber || !email || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            setError("Please don't leave empty fields")
            setStatus(false)
            return false
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            setError("Invalid expiry dates")
            setStatus(false)
            return false
        }
        if (code.length < 3) {
            setError("Invalid code")
            setStatus(false)
            return false
        }
        return true
    }

    return ( 
        <div className="container">
            {!status && (
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <h1 className="mt-4 text-center">New Transaction</h1>
                        <div className="transaction-error error text-center mt-3">
                            {eastAvailable === false && (
                                <p className="fw-semi-bold me-5"><i className="bi bi-exclamation-circle-fill me-2"></i>East Bank servers for obtaining your information are currently unavailable</p>
                            )}
                            {westernAvailable === false && (
                                <p className="fw-semi-bold me-3 mb-0"><i className="bi bi-exclamation-circle-fill me-2"></i>Western Bank servers for obtaining your information are currently unavailable</p>
                            )}
                        </div>
                        <div className="col-md-6 w-25 transaction-form">
                            <h4>Transaction Information</h4>
                            <label>Full name</label>
                            <input className="form-control" type="text" placeholder="Luke Hemmings" onChange={(e) => {setName(e.target.value)}}/>
                            <label className="mt-2">ID type</label>
                            <select className="form-select" onChange={(e) => {setIdType(e.target.value)}}>
                                <option value="National ID">National ID</option>
                                <option value="Passport">Passport</option>
                            </select>
                            <label className="mt-2">ID number</label>
                            <input className="form-control" maxlength="16" placeholder="123456789" type="text" onChange={(e) => {setIdNumber(e.target.value)}}/>
                            <label className="mt-2">Email</label>
                            <input className="form-control" type="email" placeholder="lucas@gmail.com" onChange={(e) => {setEmail(e.target.value)}}/>
                            {/* !!update here */}
                            <label className="mt-2">Bank</label>
                            <select className="form-select" onChange={(e) => {setBank(e.target.value)}}>
                                <option value="Western Bank">Western Bank</option>
                                <option value="East Bank">East Bank</option>
                            </select>
                            <label className="mt-2">Amount</label>
                            <input className="form-control" type="number" onChange={(e) => {setAmount(e.target.value)}}/>
                        </div>
                    
                        <div className="col-md-6 w-25 transaction-form">
                            <h4>Card details</h4>
                            <img src={require('../img/companies.png')} alt="" height={60} width={300} />
                            <br />
                            <label className="mt-2">Name on card</label>
                            <input placeholder="Bruce Wayne" className="form-control" type="text" onChange={(e) => {setCardName(e.target.value)}}/>
                            <label className="mt-2">Card number</label>
                            <input placeholder="xxxx xxxx xxxx xxxx" className="form-control" maxLength="16" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                            <label className="mt-2">Date of expiry</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <input placeholder="mes" className="form-control" maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                                </div>
                                <div className="col-md-6">
                                    <input placeholder="año" className="form-control" maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                                </div>
                            </div>
                            <label className="mt-2">Security code</label>
                            <input placeholder="CVV" className="form-control w-25" maxLength="4" type="text" onChange={(e) => {setCode(e.target.value)}}/>
                            <button className="btn btn-warning w-50 custom-margin">Pagar</button>
                        </div>
                    {error && <div className="error">
                        <p>{error}</p>
                    </div>}
                    </div>  
                </form>
                
            )}
            {status && (
                <TransactionDetails data={data} />
            )}
        </div>
     );
}
 
export default TransactionForm;