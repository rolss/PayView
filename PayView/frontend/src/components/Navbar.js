// reusable components. Simple navbar template
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>PayView</h1>
                </Link>
                <nav>
                    {/* <div> */}
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/signup">Registrarse</Link>
                    {/* </div> */}
                </nav>
            </div>
        </header>
    )
}

export default Navbar