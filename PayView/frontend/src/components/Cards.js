import { useEffect, useState, useSyncExternalStore } from "react"
import NewCard from "../components/NewCard"
import History from "../components/History"

const Cards = ({user, eastAvailable, westernAvailable, fullUnavailable}) => {
    const [error, setError] = useState(null)

    const [westernCards, setWesternCards] = useState('')
    const [eastCards, setEastCards] = useState('')

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
                }

                if (!response1.ok) {
                    setError(json1.error)
                }
            } catch (error) {
                console.error('Error at fetchCards:', error.message)
            }

            try {

                const response2 = await fetch('/api/western/query/fetchCards', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json2 = await response2.json()
                console.log("Cards2 json", json2.cards)
                
                if (response2.ok) {
                    setWesternCards(json2.cards)
                }

                if (!response2.ok) {
                    setError(json2.error)
                }
                
            } catch (error) {
                console.error('Error at fetchCards:', error.message)
            }
        }

        fetchCards()
        
    } , [])

    useEffect(() => {
        console.log("Western cards: ",westernCards)
    }, [westernCards])
    
    

    return ( 
        <div className="container-fluid mx-md-4">
            {/* <div className={fullUnavailable ? "alert alert-danger mt-3 p-0 pt-3 pb-2 ps-4" : ""} style={{ width: "65%" }}> */}
            <div className="mt-5 ms-sm-4 ps-sm-2">
                {eastAvailable === false && (
                    <div className="error">
                        <p className="fw-semi-bold"><i className="bi bi-exclamation-circle-fill me-2"></i>East Bank servers for obtaining your information are currently unavailable</p>
                    </div>
                )}
                {westernAvailable === false && (
                    <div className="error">
                        <p className="fw-semi-bold"><i className="bi bi-exclamation-circle-fill me-2"></i>Western Bank servers for obtaining your information are currently unavailable</p>
                    </div>
                )}
            </div>
            {/* </div> */}
            <div className="row mt-5 ms-sm-3">
                <div className="me-xl-5 me-md-3 col-12 col-md-7 col-lg-8 px-xl-4">
                    <h2 className="mb-4">Cards</h2>
                    {error && 
                    <div className="error">
                        <p>{error}</p>
                    </div>}
                    {(westernCards || eastCards) && 
                    <table className="table mb-5">
                        <thead>
                            <tr>
                                <th>Card</th>
                                <th>Brand</th>
                                <th>Balance</th>
                                <th className="d-sm-block d-none">Bank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eastCards && eastCards.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.cardNumber}</td>
                                    <td>{item.company}</td>
                                    <td>{item.balance}</td>
                                    <td className="d-sm-block d-none">{item.bank}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id, item.bank)}>Unlink</button>
                                    </td>
                                </tr>
                            ))
                            }
                            {westernCards && westernCards.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.cardNumber}</td>
                                    <td>{item.company}</td>
                                    <td>{item.balance}</td>
                                    <td className="d-sm-block d-none">{item.bank}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id, item.bank)}>Unlink</button>
                                    </td>
                                </tr>
                            ))
                            }
                            
                        </tbody>
                    </table>
                    }
                    {(!westernCards && !eastCards) && 
                        <div className="mb-5">
                            <p>No cards found. Please add a card or try again later</p>
                        </div>
                    }      
                    {/* <div> */}
                    <History user={user} initial={true}/>
                    {/* </div> */}
                </div>
                    
                <div className="col-8 col-sm-6 col-md-4 col-lg-3 px-xl-4 mt-5 mt-md-0 mb-4 mb-md-0">
                    <div>
                        <NewCard user={user} setEastCards={setEastCards} setWesternCards={setWesternCards} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cards;