import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [userCheck, setUserCheck] = useState(false)
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email, password}
        console.log(user)
        // en setupProxy ya estamos haciendo proxy a localhost:4000 en todos los fetch que haga el frontend
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
            setUserCheck(true)
        }
        
        if (response.ok) {
            setUserCheck(false)
            navigate('/view/' + json.email)
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
                {error && <p>El usuario no se encuentra registrado</p>}
            </form>
        </div>
     );
}
 
export default Login;