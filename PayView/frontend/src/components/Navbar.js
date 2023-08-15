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

    const handleClick = () => {
        logout()
    }
    
    return (
      <>
      <nav class="navbar navbar-expand-md navbar-light shadow py-3">
        <div class="container-fluid">
          <a class="navbar-brand ms-xl-5 ms-4" style={{ fontSize: '30px'}} href="/"><i class="bi bi-wallet2 md-icon me-2"></i> PayView</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            {user &&
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/transaction">Pay</a>
                <a class="nav-link active" href="/view">View</a>
                <a class="nav-link active logout" href='/login' onClick={handleClick}>Log out</a>
                <Help/>
              </div>
            }
            {!user &&
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
              <a class="nav-link active" href="/login">Log in</a>
              <a class="nav-link active" href="/signup">Sign up</a>
              <Help/>
            </div>
            }
          </div>
        </div>
      </nav>   
      </>
    )
}

export default NavBar