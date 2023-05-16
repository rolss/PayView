import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const View = () => {
    const { user } = useAuthContext()

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [balance, setBalance] = useState('000')
    const [history, setHistory] = useState('')
    const [cardView, setCardView] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch('api/action/history', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setHistory(json.history)
            console.log(json)
        }

        fetchHistory()

    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const details = {
            cardName, cardNumber, expMonth, expYear, code
        }
 
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
            console.log(json)
            setBalance(json.balance)
            // Para eso que viene, hay que crear un context global del historial. 
            // Luego aqui va a haber un setHistorial(json.historial) pero todavia no se ha agregado el historial al backend ni al API
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
                {/* !! This will be transformed into a table of sorts */}
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