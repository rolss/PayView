import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}

        // en setupProxy ya estamos haciendo proxy a localhost:4000 en todos los fetch que haga el frontend
        const response = await fetch('/api/user/login')
        const json = await response.json() 

        if (!response.ok) {
            setError(json.error)
        }
        
        if (response.ok) {
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
                <input type="text"/>
                <input type="text"/>
                <button>Ingresar</button>
            </form>
        </div>
     );
}
 
export default Login;