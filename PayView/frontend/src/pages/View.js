import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Cards from "../components/Cards"
import History from "../components/History"
import NewCard from "../components/NewCard"


const View = () => {
    const { user } = useAuthContext()
    
    const [eastAvailable, setEastAvailable] = useState(true)
    const [westernAvailable, setWesternAvailable] = useState(true)
    const [westernCards, setWesternCards] = useState('')
    const [eastCards, setEastCards] = useState('')

    const [error, setError] = useState(null)


    useEffect(() => {
        const checkEastAvailability = async () => {
            try {
                const response = await fetch('api/east/query/checkAvailability', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    setEastAvailable(true)
                }
                if (!response.ok) {
                    setEastAvailable(false)
                }
            } catch (error) {
                setEastAvailable(false)
                console.error('Error:', error.message)
            }
        }
        const checkWesternAvailability = async () => {
            try {
                const response = await fetch('api/western/query/checkAvailability', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    setWesternAvailable(true)
                }
                if (!response.ok) {
                    setWesternAvailable(false)
                }
            } catch (error) {
                setEastAvailable(false)
                console.error('Error:', error.message)
            }
        }

        checkEastAvailability()
        checkWesternAvailability()
    }, [user.token])

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

    return ( 
     <div className="container-fluid mx-md-4">
        
        <div className="mt-5 ms-sm-4 ps-sm-2">
            {/* errors will be displayed only if either of the two bank query microservices is down */}
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
 
        <div className="row mt-5 ms-sm-3"> 
            <div className="me-xl-5 me-md-3 col-12 col-md-7 col-lg-8 px-xl-4">   
                <Cards 
                user={user} 
                westernCards={westernCards} eastCards={eastCards}
                setWesternCards={setWesternCards} setEastCards={setEastCards}
                error={error} setError={setError}
                />
                <History user={user} initial={true}/>
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
 
export default View;