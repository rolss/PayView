import { useState } from "react"
import { useNavigate } from "react-router-dom"

const View = () => {

    const [cardNumber, setCardNumber] = useState('')
    const [balance, setBalance] = useState('000')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/user/cardInfo/' + cardNumber)
        const json = await response.json()

        if (response.ok) {
            console.log(json)
            setBalance(json.balance)
            // Luego aqui va a haber un setHistorial(json.historial) pero todavia no se ha agregado el historial al backend ni al API
        }
        

    }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Consultar saldo</h2>
                <label>Numero de tarjeta</label>
                <input type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                <button>Consultar</button>
            </form>
            <div>
                <h4>Saldo: {balance}</h4>
                <h5>Historial: </h5>
            </div>
            <div>
                <button onClick={navigate('/transaction')}>Realizar una transacción</button>
            </div>
        </div>
     );
}
 
export default View;