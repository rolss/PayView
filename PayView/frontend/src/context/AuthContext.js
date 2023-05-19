import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

// if login, set user to payload, which includes the authorization token
// if logout, set user to null
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // Create user as a global state
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // Initial checkup verifies if user is already logged in
    useEffect(() => {
        // check local storage for user authentication credentials
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({type:'LOGIN', payload: user})
        }
    }, []) 

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}