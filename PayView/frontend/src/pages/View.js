import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Cards from "../components/Cards"
import History from "../components/History"

const View = () => {
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [available, setAvailable] = useState(true)

    const updateError = (newError) => {
        setError(newError);
    };

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

    // !!Add: loading screen to history
    return ( 
        <div>
            {available === false && (
                <div className="error">El servidor no se encuentra disponible</div>
            )}
            {available === true && (
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