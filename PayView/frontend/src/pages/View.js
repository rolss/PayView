// !! consider turning something here into component (?)

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const View = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [balance, setBalance] = useState('000')
    const [history, setHistory] = useState('')
    const [cardView, setCardView] = useState('')

    const [error, setError] = useState(null)

    // Fetch history only once when View page loads
    useEffect(() => {
        // Get user history, send token stored in context
        const fetchHistory = async () => {
            const response = await fetch('api/action/history', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                setHistory(json.history)
            }
            if (!response.ok) {
                setError(json.error)
            }
        }

        fetchHistory()
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const details = {
            cardName, cardNumber, expMonth, expYear, code
        }
        
        // Send card details and authorization token to receive card balance
        const response = await fetch('/api/action/balance', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            setBalance(json.balance)
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Consultar saldo</h2>
                <label>Nombre del tarjetahabiente</label>
                <input type="text" onChange={(e) => {setCardName(e.target.value)}}/>
                <label>Numero de la tarjeta</label>
                <input type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                <label>Fecha de expiracion</label>
                <input type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                <input type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                <label>Código de seguridad</label>
                <input type="text" onChange={(e) => {setCode(e.target.value)}}/>
                <button>Consultar</button>
            </form>
            <div>
                <h4>Saldo: {balance}</h4>
                <h5>Historial: </h5>
                {/* !!modify: this will be transformed into a table */}
                {history && history.map((item) => (
                    <div key={item.id}>
                    <p>{item.amount}<span className="tab"></span>{item.description}<span className="tab"></span>{item.cardNumber}</p>
                </div>
                ))}
            </div>
        </div>
     );
}
 
export default View;