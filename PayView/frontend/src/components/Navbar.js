// reusable components. Simple navbar template
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'


const Navbar = () => {
    // global user state from AuthContext and logout function from useLogout hook
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>PayView</h1>
                </Link>
                <nav>
                    {user && <div>
                        <span>{user.email}</span>
                        <Link to="/view">Consultar</Link>
                        <Link to="/transaction">Realizar</Link>
                        <button onClick={handleClick}>Cerrar sesión</button>
                    </div>}
                    {!user && <div>
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/signup">Registrarse</Link>
                    </div>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar