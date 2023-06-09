import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Cards from "../components/Cards"
import History from "../components/History"

const View = () => {
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [eastAvailable, setEastAvailable] = useState(true)
    const [westernAvailable, setWesternAvailable] = useState(true)

    const updateError = (newError) => {
        setError(newError);
    };

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
                setWesternAvailable(false)
                console.error('Error:', error.message)
            }
        }

        checkEastAvailability()
        checkWesternAvailability()
    }, [user.token])

    // !!Add: loading screen to history
    return ( 
        <div>
            {eastAvailable === false && (
                <div className="error">El servidor no se encuentra disponible</div>
            )}
            {eastAvailable === true && (
                <div>
                    {error && 
                    <div className="error">
                        <p>{error}</p>
                    </div>}
                    <Cards user={user} updateError={updateError}/>
                    <History user={user} initial={true}/>
                </div>
            )}
        </div>
     );
}
 
export default View;