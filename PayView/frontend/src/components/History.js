import format from 'date-fns/format'
import { useEffect, useState } from 'react'

const History = ({user, initial}) => {
    
    const [history, setHistory] = useState('')
    const [error, setError] = useState(null)
    
    // Fetch history only once when View page loads
    useEffect(() => {
        // Get user history, send authorization token stored in context
        const fetchHistory = async () => {
            try {
                // Fetch all history from east bank
                const response1 = await fetch('/api/east/query/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json1 = await response1.json()
                
                // update history 
                if (response1.ok) {
                    setHistory([...json1.history])
                }
                if (!response1.ok) {
                    setError(json1.error)
                }
            } catch (error) {
                // setAvailable(false)
                console.error('Error:', error.message)
            }

            try {
                const response2 = await fetch('/api/western/query/history', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json2 = await response2.json()

                if (response2.ok) {
                    setHistory(prevHistory => [...prevHistory, ...json2.history]);
                }
                
                if (!response2.ok) {
                    setError(json2.error)
                }
                
            } catch (error) {
                // setAvailable(false)
                console.error('Error:', error.message)
            }
        }

        fetchHistory()
    }, [user.token, initial])

    useEffect(() => {
        if (initial === true) {
            setHistory(history.slice(0,3))
        }
    }, [history])
    

    return ( 
        <div>
            {/* <div className="row mt-5">
                <div className="col-8"> */}
                    <h2 className='mb-4'>History</h2>
                    {error && 
                    <div className="error">
                        <p>{error}</p>
                    </div>}
                    <table className="history table">
                        <thead>
                            <tr>
                                <th>Paid</th>
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
                                    <td>{item.cardNumber}</td>
                                    <td>{item.bank}</td>
                                    <td>{format(new Date(item.createdAt), 'dd/MM/yy')}</td>
                                    <td>{format(new Date(item.createdAt), 'HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {history.length >= 3 && initial && <a className='btn btn-sm btn-warning' href="/fullhistory">View more</a>}
                </div>
        //     </div>
        // </div>
     );
}
 
export default History;