import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { dispatch } = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}
        
        // Send request to backend based on input fields
        const response = await fetch('/api/user/login', {
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
            navigate('/view')
            setEmail('')
            setPassword('')
            setError('')
            console.log('Ingreso exitoso', json)
        }

    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                <button>Ingresar</button>
                {error && 
                <div className="error">
                    <p>{error}</p>
                </div>}
            </form>
        </div>
     );
}
 
export default Login;