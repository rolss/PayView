import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Transaction = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [idType, setIdType] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [amount, setAmount] = useState(0)
    const [paymentType, setPaymentType] = useState('')
    const [installments, setInstallments] = useState(0)
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')
    
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const transaction = {
            name, idType, idNumber, 
            description, location, amount, 
            paymentType, installments, cardName, 
            cardNumber, expMonth, expYear, code
        }

        const response = await fetch('/api/action/newtransaction', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setStatus('Transacción Fallida')
            setError(json.error)
        }
        if (response.ok) {
            setStatus('Transacción exitosa!')
            setError('')
        }

    }


    return ( 
        <form onSubmit={handleSubmit}>
            <label>Nombre completo</label>
            <input type="text" onChange={(e) => {setName(e.target.value)}}/>
            <label>Tipo de identificación</label>
            <input type="text" onChange={(e) => {setIdType(e.target.value)}}/>
            <label>Número de identificación</label>
            <input type="text" onChange={(e) => {setIdNumber(e.target.value)}}/>
            <label>Monto</label>
            <input type="number" onChange={(e) => {setAmount(e.target.value)}}/>
            <label>Descripción</label>
            <input type="text" onChange={(e) => {setDescription(e.target.value)}}/>
            <label>Sede</label>
            <input type="text" onChange={(e) => {setLocation(e.target.value)}}/>
            <label>Tipo de pago</label>
            <input type="text" onChange={(e) => {setPaymentType(e.target.value)}}/>
            <label>Numero de cuotas</label>
            <input type="number" onChange={(e) => {setInstallments(e.target.value)}}/>
            <label>Nombre del titular</label>
            <input type="text" onChange={(e) => {setCardName(e.target.value)}}/>
            <label>Numero de la tarjeta</label>
            <input type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
            <label>Fecha de expiracion</label>
            <input type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
            <input type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
            <label>Código de seguridad</label>
            <input type="text" onChange={(e) => {setCode(e.target.value)}}/>
            <button>Enviar</button>
            <p>{status}</p>
        </form>
     );
}
 
export default Transaction;