import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const TransactionForm = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [idType, setIdType] = useState('cedula de ciudadania')
    const [idNumber, setIdNumber] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [amount, setAmount] = useState(0)
    const [paymentType, setPaymentType] = useState('tarjeta de credito')
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

        validations()
        
        // Group all variables the backend requires to log transaction into database
        const transaction = {
            name, idType, idNumber, 
            description, location, amount, 
            paymentType, installments, cardName, 
            cardNumber, expMonth, expYear, code
        }

        // Send request to backend to post transaction, using token from context
        const response = await fetch('/api/transaction/newtransaction', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setStatus('Transacción Fallida')
            setError(json.error)
        }
        
        if (response.ok) {
            setStatus('Transacción exitosa!')
            setError('')
        }

    }
    
    const validations = () => {
        if (!name || !idNumber || !description || !location || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            setError("Por favor no deje campos vacios")
            setStatus('Transacción Fallida')
            return
        }
        if ((idType==="cedula de ciudadania" || idType==="cedula de extranjeria") && idNumber.length !== 10) {
            setError("Cedula invalida")
            setStatus('Transacción Fallida')
            return
        }
        if (idType==="pasaporte" && idNumber.length !== 8) {
            setError("Pasaporte invalido")
            setStatus('Transacción Fallida')
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            setError("Las fechas de la tarjeta son invalidas. Por favor use solo dos dígitos")
            setStatus('Transacción Fallida')
            return
        }
        if (code.length !== 3) {
            setError("El codigo ingresado es inválido")
            setStatus('Transacción Fallida')
            return
        }
        if (amount <= 0) {
            setError("Debe ingresar un valor distinto de 0")
            setStatus('Transacción Fallida')
            return
        }
    }

    return ( 
        <div>
            {paymentType === 'tarjeta de credito' && (
                <form onSubmit={handleSubmit}>
                    <label>Tipo de pago</label>
                    <select onChange={(e) => {setPaymentType(e.target.value)}}>
                        <option value="tarjeta de credito">Tarjeta de crédito</option>
                        <option value="tarjeta de debito">Tarjeta de débito</option>
                    </select>
                    <label>Nombre completo</label>
                    <input type="text" onChange={(e) => {setName(e.target.value)}}/>
                    <label>Tipo de identificación</label>
                    <select onChange={(e) => {setIdType(e.target.value)}}>
                        <option value="cedula de ciudadania">Cedula de Ciudadanía</option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="tarjeta de identidad">Tarjeta de Identidad</option>
                        <option value="cedula de extranjeria">Cedula de Extranjería</option>
                    </select>
                    <label>Número de identificación</label>
                    <input maxlength="10" type="text" onChange={(e) => {setIdNumber(e.target.value)}}/>
                    <label>Monto</label>
                    <input type="number" onChange={(e) => {setAmount(e.target.value)}}/>
                    <label>Descripción</label>
                    <input type="text" onChange={(e) => {setDescription(e.target.value)}}/>
                    <label>Sede</label>
                    <input type="text" onChange={(e) => {setLocation(e.target.value)}}/>
                    {/* !!update here */}
                    <label>Numero de cuotas</label>
                    <select onChange={(e) => {setInstallments(e.target.value)}}>
                        <option value="1">1</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                    </select>
                    <label>Nombre del titular</label>
                    <input type="text" onChange={(e) => {setCardName(e.target.value)}}/>
                    <label>Numero de la tarjeta</label>
                    <input maxLength="16" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                    <label>Fecha de expiracion</label>
                    <input maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                    <input maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                    <label>Código de seguridad</label>
                    <input maxLength="3" type="text" onChange={(e) => {setCode(e.target.value)}}/>
                    <button>Enviar</button>
                    <p>{status}</p>
                    {error && <div className="error">
                        <p>{error}</p>
                    </div>}
                </form>
            )}
            {paymentType === 'tarjeta de debito' && (
                <div>
                    <label>Tipo de pago</label>
                    <select onChange={(e) => {setPaymentType(e.target.value)}}>
                        <option value="tarjeta de credito">Tarjeta de crédito</option>
                        <option value="tarjeta de debito">Tarjeta de débito</option>
                    </select>
                    <br></br>
                    <a href="https://www.pse.com.co/persona" target="_blank"  rel="noreferrer">Pago por PSE</a>
                    {error && <div className="error">
                        <p>{error}</p>
                    </div>}
                </div>
            )}
        </div>
     );
}
 
export default TransactionForm;