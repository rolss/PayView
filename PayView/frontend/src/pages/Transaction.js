import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TransactionForm from "../components/TransactionForm";

const Transaction = () => {
    const { user } = useAuthContext()
    
    const [available, setAvailable] = useState(null)

    useEffect(() => {
        const checkAvailability = async () => {
            try {
                const response = await fetch('api/transaction/checkAvailability', {
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
    

    return ( 
        <div>
            {available === false && (
                <div>El servidor no se encuentra disponible</div>
            )}
            {available === true && (
                <TransactionForm />
            )}
        </div>
     );
}
 
export default Transaction;