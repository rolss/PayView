import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import TransactionDetails from "./TransactionDetails"

const TransactionForm = () => {
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [idType, setIdType] = useState('Cédula de Ciudadanía')
    const [idNumber, setIdNumber] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [amount, setAmount] = useState(0)
    const [paymentType, setPaymentType] = useState('tarjeta de credito')
    const [installments, setInstallments] = useState('1')
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [status, setStatus] = useState(null)
    const [error, setError] = useState('')
    const [data, setData] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }
        
        // Group all variables the backend requires to log transaction into database
        const transaction = {
            name, idType, idNumber, 
            description, location, amount, 
            installments, cardName, 
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
            setStatus(false)
            setError(json.error)
        }
        
        if (response.ok) {
            setStatus(true)
            setError('')
        }

        setData({...json, status})

    }
    
    const validate = () => {
        if (!name || !idNumber || !description || !location || !amount || !cardName || !cardNumber || !expMonth || !expYear || !code) {
            setError("Por favor llene todos los campos")
            setStatus(false)
            return false
        }
        if ((idType==="Cédula de Ciudadanía" || idType==="Cédula de Extranjería") && idNumber.length !== 10) {
            setError("Cédula invalida")
            setStatus(false)
            return false
        }
        if (idType==="Pasaporte" && idNumber.length !== 8) {
            setError("Pasaporte inválido")
            setStatus(false)
            return false
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            setError("Las fechas de la tarjeta son invalidas. Por favor use solo dos dígitos")
            setStatus(false)
            return false
        }
        if (code.length !== 3) {
            setError("El codigo ingresado es inválido")
            setStatus(false)
            return false
        }
        if (amount <= 0) {
            setError("Debe ingresar un monto distinto de 0")
            setStatus(false)
            return false
        }

        return true
    }

    return ( 
        <div>
            {paymentType === 'tarjeta de credito' && !status && (
                <form className="" onSubmit={handleSubmit}>
                    <h2>Nueva Transacción</h2>
                    <div className="row">
                        <div className="col-md-4 transactionform">
                            <h4 className="mt-5">Datos Personales</h4>
                            <label>Nombre completo</label>
                            <input className="form-control" type="text" onChange={(e) => {setName(e.target.value)}}/>
                            <label>Tipo de identificación</label>
                            <select className="form-select" onChange={(e) => {setIdType(e.target.value)}}>
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                <option value="Cédula de Extranjería">Cedula de Extranjería</option>
                            </select>
                            <label>Número de identificación</label>
                            <input className="form-control" maxlength="10" type="text" onChange={(e) => {setIdNumber(e.target.value)}}/>
                            <label>Descripción</label>
                            <input className="form-control" type="text" onChange={(e) => {setDescription(e.target.value)}}/>
                            <label>Sede</label>
                            <input className="form-control" type="text" onChange={(e) => {setLocation(e.target.value)}}/>
                            {/* !!update here */}
                        </div>
                        <div className="col-md-4 transactionform">
                            <h4 className="mt-5">Datos de la Transacción</h4>
                            <label>Monto</label>
                            <input className="form-control" type="number" onChange={(e) => {setAmount(e.target.value)}}/>
                            <label>Medio de pago</label>
                            <select className="form-select" onChange={(e) => {setPaymentType(e.target.value)}}>
                                <option value="tarjeta de credito">Tarjeta de crédito</option>
                                <option value="tarjeta de debito">Tarjeta de débito</option>
                            </select>
                            <label>Numero de cuotas</label>
                            <select className="form-select" onChange={(e) => {setInstallments(e.target.value)}}>
                                <option value="1">1</option>
                                <option value="6">6</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div className="col-md-4 transactionform">
                            <h4 className="mt-5">Datos de la Tarjeta</h4>
                            <label>Nombre del titular</label>
                            <input placeholder="Bruce Wayne" className="form-control" type="text" onChange={(e) => {setCardName(e.target.value)}}/>
                            <label>Numero de la tarjeta</label>
                            <input placeholder="xxxx xxxx xxxx xxxx" className="form-control" maxLength="16" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                            <label>Fecha de expiracion</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <input placeholder="mes" className="form-control" maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                                </div>
                                <div className="col-md-6">
                                    <input placeholder="año" className="form-control" maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                                </div>
                            </div>
                            <label>Código de seguridad</label>
                            <input placeholder="CVV" className="form-control w-50 mx-auto" maxLength="3" type="text" onChange={(e) => {setCode(e.target.value)}}/>
                            <button className="btn btn-warning mt-4 w-75">Pagar</button>
                        </div>
                        <p>{status}</p>
                        {error && <div className="error">
                            <p>{error}</p>
                        </div>}
                    </div>
                </form>
            )}
            {status && (
                <TransactionDetails data={data} />
            )}
            {paymentType === 'tarjeta de debito' && (
                <div>
                    <h3>Nueva Transacción</h3>
                    <label className="mt-3">Tipo de pago</label>
                    <select className="form-select w-25 mx-auto" onChange={(e) => {setPaymentType(e.target.value)}}>
                        <option value="tarjeta de debito">Tarjeta de débito</option>
                        <option value="tarjeta de credito">Tarjeta de crédito</option>
                    </select>
                    <br></br>
                    <a className="btn btn-warning" href="https://www.pse.com.co/persona" target="_blank"  rel="noreferrer">Pago por PSE</a>
                    {error && <div className="error">
                        <p>{error}</p>
                    </div>}
                </div>
            )}
        </div>
     );
}
 
export default TransactionForm;