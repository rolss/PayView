// Reusable
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from "react";
import Help from './Help';
// import { Navbar, Container, Nav } from "react-bootstrap";
// import logo from "../assets/img/logo.jpeg";

const NavBar = () => {
    // global user state from AuthContext and logout function from useLogout hook
    const { user } = useAuthContext()
    const { logout } = useLogout()
    // const location = useLocation()

    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, seScrolled] = useState(false);
    // const [where, setWhere] = useState('')

    const handleClick = () => {
        logout()
    }

    useEffect(() => {
        const onScroll = () => {
          if (window.scrollY > 50) {
            seScrolled(true);
          } else {
            seScrolled(false);
          }
        };
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, []);
    
      const onUpdateActiveLink = (value) => {
        setActiveLink(value);
      };

      // if (location.pathname === '/view') {
      //   setWhere('view')
      // } else if (location.pathname === '/transaction') {
      //   setWhere('transaction')
      // } else if (location.pathname === '/login' || location.pathname === '/signup') {
      //   setWhere('register')
      // }
    
    return (
        <header className="customheader shadow">
            <div className="container">
                <Link to="/">
                    <h1>PayView</h1>
                </Link>
                <nav>
                    {user && <div>
                        {/* <span>{user.email}</span> */}
                        <Help />
                        <Link className='btn btn-dark' to="/view">View</Link>
                        <Link className='btn btn-dark' to="/transaction">Pay</Link>
                        <button className='btn btn-outline-danger' onClick={handleClick}>Log out</button>
                    </div>}
                    {!user && <div>
                        <Help />
                        <Link className='text-warning-hover' to="/login">Log in</Link>
                        <Link className='text-warning-hover' to="/signup">Sign up</Link>
                    </div>}
                </nav>
            </div>
        </header>
    )
}

export default NavBar