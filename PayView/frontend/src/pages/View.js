import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Cards from "../components/Cards"
import History from "../components/History"

const View = () => {
    const { user } = useAuthContext()

    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
    const [code, setCode] = useState('')

    const [cards, setCards] = useState('')

    const [error, setError] = useState(null)
    const [available, setAvailable] = useState(true)

    useEffect(() => {
        const checkAvailability = async () => {
            try {
                const response = await fetch('api/query/checkAvailability', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    setAvailable(true)
                }
                if (!response.ok) {
                    setAvailable(false)
                }
            } catch (error) {
                setAvailable(false)
                console.error('Error:', error.message)
            }
        }

        checkAvailability()
    }, [user.token])
    
    

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        if (!cardName || !cardNumber || !expMonth || !expYear || !code) {
            setError("Por favor no deje campos vacios")
            return
        }
        if (expMonth.length !== 2 || expYear.length !== 2) {
            setError("Las fechas de la tarjeta son invalidas")
        }
        if (code.length !== 3) {
            setError("El codigo ingresado es inválido")
        }
        
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
                setError(null)
                console.log(json.message)
            }
            if (!response.ok) {
                setError(json.error)
            }
        } catch (error) {
            setAvailable(false)
            console.error('Error:', error.message)
        }
    },[cardName, cardNumber, expMonth, expYear, code, user.token])

    useEffect(() => {
        // Get user history, send token stored in context
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
                    setError(json.error)
                }
            } catch (error) {
                console.error('Error:', error.message)
            }
        }

        fetchCards()
    }, [user.token, handleSubmit]) // Reload saved cards when a new card is consulted

    // !!Add: loading screen to history
    return ( 
        <div>
            {available === false && (
                <div className="error">El servidor no se encuentra disponible</div>
            )}
            {available === true && (
                <div>
                    <div className="view">
                        <form classname="viewForm" onSubmit={handleSubmit}>
                            {error && 
                            <div className="error">
                                <p>{error}</p>
                            </div>}
                            <h2>Consultar saldo</h2>
                            {/* make this a component */}
                            <label>Nombre del tarjetahabiente</label>
                            <input type="text" onChange={(e) => {setCardName(e.target.value)}}/>
                            <label>Numero de la tarjeta</label>
                            <input maxLength="16" type="text" onChange={(e) => {setCardNumber(e.target.value)}}/>
                            <label>Fecha de expiracion</label>
                            <input maxLength="2" type="text" onChange={(e) => {setExpMonth(e.target.value)}}/>
                            <input maxLength="2" type="text" onChange={(e) => {setExpYear(e.target.value)}}/>
                            <label>Código de seguridad</label>
                            <input maxLength="3" type="text" onChange={(e) => {setCode(e.target.value)}}/>
                            <button className="formbutton">Consultar</button>
                        </form>
                            <div className="cards"><Cards cards={cards} /></div>
                    </div>  
                    <div className="history"><History initial={true}/></div>
                </div>
            )}
        </div>
     );
}
 
export default View;