import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [available, setAvailable] = useState(null)

    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    useEffect(() => {
        const checkAvailability = async () => {
            try {
                const response = await fetch('api/user/checkAvailability')
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
    }, [])
    
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
            {available === false && (
                <div className="error">El servidor no se encuentra disponible</div>
            )}
            {available === true && (
                <div className="container mw-100 stripe-row">
                    <div className="row align-items-center justify-content-center">
                        <form className="user-form" onSubmit={handleSubmit}>
                            <h1 className="mb-3 pb-4 h1">Welcome back</h1>
                            {error &&
                            <div className="error">
                                <p>{error}</p>
                            </div>}
                            <label className="form-label text-black ms-1 force-left">Email address</label>
                            <input className="form-control form-control-sm mb-3 ms-1" placeholder="john@hotmail.com" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                            
                            <label className="form-label text-black ms-1 force-left">Password</label>
                            <input className="form-control form-control-sm mb-3 ms-1" placeholder="•••••••••••••••••" type="password" onChange={(e) => {setEmail(e.target.value)}}/>
                            {/* <div className="form-floating">
                                <input className="form-control form-control-sm mb-3 ms-1" placeholder="email@domain.com" id="floatingInput" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                                <label id="floatingInput" className="form-label text-black-50 ms-1">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control form-control-sm ms-1" type="password" id="floatingPassword" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                                <label className="form-label text-black-50 ms-1">Password</label>
                            </div> */}
                            <a className="text-secondary text-decoration-none d-block force-left" href="#">Forgot password?</a>
                            <button className="btn btn-warning w-50 mt-5">Log in</button>
                            <p className="text-black mt-4">Don't have an account? <a className="text-secondary text-decoration-underline" href="/signup">Sign up today!</a></p>

                        </form>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default Login;