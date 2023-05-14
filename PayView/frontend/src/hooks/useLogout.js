import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // Remove user from local storage and global state
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})

        // Next: set frontend user details to null

    }
    
    return { logout } 

}