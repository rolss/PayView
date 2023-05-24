// Reusable
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/img/logo.jpeg";

const NavBar = () => {
    // global user state from AuthContext and logout function from useLogout hook
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, seScrolled] = useState(false);

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

    //   return (
    //     <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
    //         <Container>
    //           <Navbar.Brand href="#home">
    //             <div className="logo-image">
    //               <img src={logo} alt="Logo" height="100" />
    //             </div>
    //           </Navbar.Brand>
    //           <Navbar.Toggle aria-controls="basic-navbar-nav">
    //             <span className="navbar-toggler-icon"></span>
    //           </Navbar.Toggle>
    //           <Navbar.Collapse id="basic-navbar-nav" class="topnav-right">
    //             <Nav className="me-auto">
    //               {/* <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link': 'navbar-link'} onClick={()=> onUpdateActiveLink('home')}>Home</Nav.Link> */}
    //               <Nav.Link
    //                 href="#info"
    //                 className={
    //                   activeLink === "info" ? "active navbar-link" : "navbar-link"
    //                 }
    //                 onClick={() => onUpdateActiveLink("info")}
    //               >
    //                 ¿Quiénes somos?
    //               </Nav.Link>
    //               <Nav.Link
    //                 href="/view"
    //                 className={
    //                   activeLink === "info" ? "active navbar-link" : "navbar-link"
    //                 }
    //                 onClick={() => onUpdateActiveLink("view")}
    //               >
    //                 Consultar
    //               </Nav.Link>
    //               {user && <div>
    //                      <span>{user.email}</span>
    //                      <Link to="/view">Consultar</Link>
    //                      <Link to="/transaction">Realizar</Link>
    //                      <button onClick={handleClick}>Cerrar sesión</button>
    //                  </div>}
    //               {!user && <div>
    //                      <Link to="/login">Iniciar Sesión</Link>
    //                      <Link to="/signup">Registrarse</Link>
    //                  </div>}
    //             </Nav>
    //           </Navbar.Collapse>
    //         </Container>
    //     </Navbar>
    //   );
    
    return (
        <header className="customheader">
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

export default NavBar