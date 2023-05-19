import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"; 

// Invoke to consume AuthContext every time authentication credentials need to be used
export const useAuthContext = () => {
    // hook returns state and dispatch from context
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}