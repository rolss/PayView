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
        <div className>
            {available === false && (
                <div className="error">El servidor no se encuentra disponible</div>
            )}
            {available === true && (
                <div className="container text-center mw-100 stripe-row">
                    <div className="row">
                        <form className="user-form" onSubmit={handleSubmit}>
                            <h2 className="mb-3 pb-4 h1">Welcome to PayView</h2>
                            {error &&
                            <div className="error">
                                <p>{error}</p>
                            </div>}
                            <div className="form-floating">
                                <input className="form-control form-control-sm mb-3 ms-1" type="email" id="floatingInput" placeholder="email@domain.com" onChange={(e) => {setEmail(e.target.value)}}/>
                                <label id="floatingInput" className="form-label text-black-50 ms-1">Enter your email</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control form-control-sm ms-1" type="password" id="floatingPassword" placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                                <label id="floatingPassword" className="form-label text-black-50 ms-1">Enter a secure password</label>
                            </div>
                            <button className="btn btn-warning w-50 mt-5">Create account</button>
                            <p className="text-black mt-4">Already have an account? <a className="text-secondary text-decoration-underline" href="/login">Login instead</a></p>
                        </form>
                    </div>
                </div>
            )}
        </div>
     );
}

export default Signup;