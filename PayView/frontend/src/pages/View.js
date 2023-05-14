import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const View = () => {
    const { user } = useAuthContext()

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [balance, setBalance] = useState('000') // !!Needs to be feteched
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const details = {
            cardName, cardNumber, expMonth, expYear, code
        }
 
        const response = await fetch('/api/user/details/' + cardNumber, {
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
                {/* map history here: make a p with span for every transaction there is */}
                <p>5000<span className="tab"></span>Du Nord</p>
                <p>5000<span className="tab"></span>Du Nord</p>
                <p>5000<span className="tab"></span>Du Nord</p>
                <p>5000<span className="tab"></span>Du Nord</p>
            </div>
            <div>
                {/* <button>Realizar una transacción</button> */}
            </div>
        </div>
     );
}
 
export default View;