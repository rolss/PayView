import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"; 

// Invoke to consume AuthContext every time we need to use user authentication credentials
export const useAuthContext = () => {
    // hook returns state and dispatch from context
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}