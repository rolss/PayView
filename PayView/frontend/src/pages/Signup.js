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

    // Check if microservice is up and modify displayed errors accordingly
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

    return ( 
        <div className>
            {available === false && (
                <div className="alert alert-danger service-unavailable">
                    <h3 className="alert-heading">Service Unavailable</h3>
                    <hr />
                    <p>Our service is currently under maintenance to make your experience better! Please try again later</p>
                </div>
            )}
            {available === true && (
                <div className="container d-flex align-items-center justify-content-center p-0 mt-5">
                    <form className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 me-3 p-4 p-sm-5 user-form" onSubmit={handleSubmit}>
                        <h2 className="h2 ms-1 mb-5">Welcome to PayView</h2>
                        {error &&
                        <div className="error">
                            <p>{error}</p>
                        </div>}
                        <label className="form-label text-black ms-1 force-left">Email address</label>
                        <input className="form-control form-control-sm mb-3 ms-1" placeholder="john@hotmail.com" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        
                        <label className="form-label text-black ms-1 force-left">Password</label>
                        <input className="form-control form-control-sm mb-3 ms-1" placeholder="•••••••••••••••••" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                        <button className="btn btn-sm btn-warning w-50 mt-5 ms-1">Create account</button>
                        <p className="mt-2 ms-1">Already have an account? <a className="text-secondary text-decoration-underline" href="/login">Login instead</a></p>
                    </form>
                </div>
            )}
        </div>
     );
}

export default Signup;