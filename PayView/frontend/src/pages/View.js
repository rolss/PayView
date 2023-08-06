import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Cards from "../components/Cards"


const View = () => {
    const { user } = useAuthContext()
    
    const [eastAvailable, setEastAvailable] = useState(true)
    const [westernAvailable, setWesternAvailable] = useState(true)


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

    // !!Add: loading screen to history
    return ( 
        <div>    
            <Cards user={user} eastAvailable={eastAvailable} westernAvailable={westernAvailable} fullUnavailable={!eastAvailable&&!westernAvailable}/>
        </div>
     );
}
 
export default View;