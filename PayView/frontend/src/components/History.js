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

                const response1 = await fetch('/api/east/query/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json1 = await response1.json()

                const response2 = await fetch('/api/western/query/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json2 = await response2.json()
                
                if (response1.ok && response2.ok) {
                    setHistory([...json1.history, ...json2.history])
                }

                if (!response1.ok && !response2.ok) {
                    setError(json1.error)
                }


                // const response = await fetch('api/query/history', {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${user.token}`
                //     }
                // })
                // const json = await response.json()
                
                // if (response.ok) {
                //     if (initial) {
                //         setHistory(json.history.slice(0,3))
                //     } else {
                //         setHistory(json.history)
                //     }
                //     // setAvailable(true)
                // }
                // if (!response.ok) {
                //     setError(json.error)
                // }
            } catch (error) {
                // setAvailable(false)
                console.error('Error:', error.message)
            }
        }

        fetchHistory()
    }, [user.token, initial])

    return ( 
        <div className='history'>
            <h2 className='mb-4'>History</h2>
            {error && 
            <div className="error">
                <p>{error}</p>
            </div>}
            <table className="history table">
                <thead>
                    <tr>
                        <th>Balance</th>
                        <th>Description</th>
                        <th>Card</th>
                        <th>Bank</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.map((item) => (
                        <tr key={item._id}>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>{item.cardNumber}</td>
                        <td>{item.bank}</td>
                        <td>{format(new Date(item.createdAt), 'dd/MM/yy')}</td>
                        <td>{format(new Date(item.createdAt), 'HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {history.length >= 3 && initial && <a className='btn btn-warning' href="/fullhistory">View more</a>}
        </div>
     );
}
 
export default History;