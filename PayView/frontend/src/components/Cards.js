import { useCallback, useEffect, useState } from "react"

// !! updateError make it only per component
const Cards = ({user, updateError}) => {
    const [cards, setCards] = useState('')

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

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
        
        try {
            // Send card details. This will automatically add the card to the user cards
            const response = await fetch('/api/query/cardInformation', {
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
                setCards(json.cards)
            }
            if (!response.ok) {
                updateError(json.error)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    // We do this with cardId and not cardNumber because the frontend will never have the full card number for security reasons
    const handleDelete = async (cardId) => {
        const response = await fetch('/api/query/deleteCard', {
            method: 'POST',
            body: JSON.stringify({cardId}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            updateError(json.error)
        }
        
        if (response.ok) {
            setCards(json.cards)
            updateError('')
        }
    }

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('api/query/fetchCards', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                
                if (response.ok) {
                    setCards(json.cards)
                }
                if (!response.ok) {
                    updateError(json.error)
                }
            } catch (error) {
                console.error('Error:', error.message)
            }
        }

        fetchCards()
    } , [])
    

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <form onSubmit={handleSubmit}>
                        <h2>Consultar saldo</h2>
                        {/* make this a component */}
                        <label className="mt-2">Nombre del tarjetahabiente</label>
                        <input type="text" className="form-control"  onChange={(e) => {setCardName(e.target.value)}}/>
                        <label className="mt-2">Numero de la tarjeta</label>
                        <input maxLength="16" className="form-control" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                        <label className="mt-2">Fecha de expiracion</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input className="form-control" maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                            </div>
                        </div>
                        <label className="mt-2">Código de seguridad</label>
                        <input maxLength="3" className="form-control" type="text" onChange={(e) => {setCode(e.target.value)}}/>
                        <button className="formbutton btn btn-warning">Consultar</button>
                    </form>
                </div>
                <div className="col-md-9">
                    <h4>Tarjetas</h4>
                    <table className="table text-light ml-4">
                        <thead>
                            <tr>
                                <th>Tarjeta</th>
                                <th>Empresa</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards && cards.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.cardNumber}</td>
                                    <td>{item.company}</td>
                                    <td>{item.balance}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {!cards && <p>Usted no cuenta con tarjetas vinculadas</p> }
                </div>
            </div>
        </div>
     );
}
 
export default Cards;