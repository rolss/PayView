import format from 'date-fns/format'
import { useEffect, useState } from 'react'

const History = ({user, initial}) => {
    
    const [history, setHistory] = useState('')
    const [error, setError] = useState(null)
    
    // Fetch history only once when View page loads
    useEffect(() => {
        // Get user history, send token stored in context
        const fetchHistory = async () => {
            try {
                const response = await fetch('api/query/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                
                if (response.ok) {
                    if (initial) {
                        setHistory(json.history.slice(-3))
                    } else {
                        setHistory(json.history)
                    }
                    // setAvailable(true)
                }
                if (!response.ok) {
                    setError(json.error)
                }
            } catch (error) {
                // setAvailable(false)
                console.error('Error:', error.message)
            }
        }

        fetchHistory()
    }, [user.token, initial])

    return ( 
        <div className='history'>
            <h4>Historial</h4>
            {error && 
            <div className="error">
                <p>{error}</p>
            </div>}
            <table className="history">
                <thead>
                    <tr>
                        <th>Monto</th>
                        <th>Descripcion</th>
                        <th>Tarjeta</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.map((item) => (
                        <tr key={item._id}>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>{item.cardNumber}</td>
                        <td>{format(new Date(item.createdAt), 'dd/MM/yy')}</td>
                        <td>{format(new Date(item.createdAt), 'HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/fullhistory">Ver mas</a>
        </div>
     );
}
 
export default History;