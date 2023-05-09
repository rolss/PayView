import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}

        // en setupProxy ya estamos haciendo proxy a localhost:4000 en todos los fetch que haga el frontend
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
        </div>
     );
}
 
export default Signup;