import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}

        // Send request to backend based on input fields
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() 

        if (!response.ok) {
            setError(json.error)
        }
        
        if (response.ok) {

            // Update local storage and global state with authentication credentials (token)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

            // Reset variables and send user to default post-login page
            setEmail('')
            setPassword('')
            setError('')
            navigate.push('/view')
            console.log('Nuevo usuario añadido', json)
        }

        navigate.push('/view')

        

    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                <button>Crear cuenta</button>
            </form>
            {error && 
            <div className="error">
                <p>{error}</p>
            </div>}
        </div>
     );
}
 
export default Signup;