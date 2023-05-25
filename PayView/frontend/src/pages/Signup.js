import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import { ClipLoader } from 'react-spinners';

const Signup = () => {
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

    // if (loading) {
    //     return (
    //         <div className="loading-spinner">
    //           <ClipLoader color="#000000" loading={loading} size={80} speedMultiplier={0.6} />
    //         </div>
    //     );
    // }

    return ( 
        <div>
            {available === false && (
                <div>El servidor no se encuentra disponible</div>
            )}
            {available === true && (
                <form className="w-25 mx-auto" onSubmit={handleSubmit}>
                    <h2>Registro</h2>
                    <label className="mt-4">Correo electrónico</label>
                    <input className="form-control mb-3" type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label>Contraseña</label>
                    <input className="form-control mb-5" type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button className="btn btn-warning w-50">Crear cuenta</button>
                    {error &&
                    <div className="error">
                        <p>{error}</p>
                    </div>}
                </form>
            )}
        </div>
     );
}
 
export default Signup;