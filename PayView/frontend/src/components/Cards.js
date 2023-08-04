import { useEffect, useState, useSyncExternalStore } from "react"
import NewCard from "../components/NewCard"
import History from "../components/History"

const Cards = ({user}) => {
    const [error, setError] = useState(null)

    const [westernCards, setWesternCards] = useState('')
    const [eastCards, setEastCards] = useState('')

    // const [toggleNewCard, setToggleNewCard] = useState(false)

    // Unlink a card with current account
    // cardId is used instead of cardNumber because the frontend will never have the full card number for security reasons
    const handleDelete = async (cardId, bank) => {

        var bank_to_fetch = ""
        if (bank === "Western Bank") {
            bank_to_fetch = "western"
        } else {
            bank_to_fetch = "east"
        }

        const response = await fetch('/api/' + bank_to_fetch + '/query/deleteCard', {
            method: 'POST',
            body: JSON.stringify({cardId}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError('')
            if (bank === "Western Bank") {
                setWesternCards(json.cards)
            } else {
                setEastCards(json.cards)
            }
        }
    }

    // const handleToggle = async () => {
    //     setToggleNewCard(!toggleNewCard)
    // }

    // Fetch all cards linked to this account and store the information in state variables
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response1 = await fetch('/api/east/query/fetchCards', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json1 = await response1.json()
                
                if (response1.ok) {
                    setEastCards(json1.cards)
                    console.log(eastCards)
                }

                const response2 = await fetch('/api/western/query/fetchCards', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json2 = await response2.json()
                
                if (response2.ok) {
                    setWesternCards(json2.cards)
                }

                if (!response1.ok && !response2.ok) {
                    setError(json1.error)
                }
                
            } catch (error) {
                console.error('Error at fetchCards:', error.message)
            }
        }

        fetchCards()
        
    } , [])
    

    return ( 
        <div className="container">
            <div className="row mt-5">
                    <div className="me-5 col-8">
                        <div className="">
                            <h2 className="mb-4">Cards</h2>
                            {error && 
                            <div className="error">
                                <p>{error}</p>
                            </div>}
                            {westernCards || eastCards && 
                            <table className="table mb-5">
                                <thead>
                                    <tr>
                                        <th>Card</th>
                                        <th>Brand</th>
                                        <th>Balance</th>
                                        <th>Bank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eastCards && eastCards.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.cardNumber}</td>
                                            <td>{item.company}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.bank}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-danger ms-5" onClick={() => handleDelete(item._id, item.bank)}>Unlink Card</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                    {westernCards && westernCards.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.cardNumber}</td>
                                            <td>{item.company}</td>
                                            <td>{item.balance}</td>
                                            <td>
                                                {item.bank}
                                                <button className="btn btn-sm btn-outline-danger ms-5" onClick={() => handleDelete(item._id, item.bank)}>Unlink</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            }
                            {!westernCards && !eastCards && 
                                <div className="mb-5">
                                    <p>No cards are currently linked to this account</p>
                                    {/* <button className="btn btn-sm btn-warning mb-5" onClick={() => handleToggle()}>Add new card</button>  */}
                                </div>
                            }      
                        </div>
                        <div>
                            <History user={user} initial={true}/>
                            {/* <button className="btn btn-sm btn-warning mb-5" onClick={() => handleToggle()}>Add new card</button> */}
                        </div>
                    </div>
                    
                    {/* {toggleNewCard &&  */}
                    <div className="col-3">
                        <div>
                            <NewCard user={user} setEastCards={setEastCards} setWesternCards={setWesternCards} />
                        </div>
                    </div>
                    {/* } */}
                    
            </div>
        </div>
     );
}
 
export default Cards;