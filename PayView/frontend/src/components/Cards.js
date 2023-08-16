const Cards = ({user, westernCards, eastCards, setWesternCards, setEastCards, error, setError}) => {

    //Ask backend to unlink a card from current account through cards ID
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
    
    return ( 
        <>
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
                {/* Display East cards piled on top of Western cards */}
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

            {/* Message displayed when the backend returns no cards linked to current user */}
            {(!westernCards && !eastCards) && 
                <div className="mb-5">
                    <p>No cards found. Please add a card or try again later</p>
                </div>
            }
        </>
     );
}
 
export default Cards;