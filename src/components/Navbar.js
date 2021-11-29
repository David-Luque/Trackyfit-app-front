import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserService from '../services/UserService';



const NavComp = ({ getTheUser, userInSession, history }) => {

    const [ loggedInUser, setLoggedInUser ] = useState(null);

    const userService = new UserService();

    useEffect(()=>{
        setLoggedInUser(userInSession);
    }, [ userInSession ]);


    const logout = ()=>{
        userService.logout()
        .then(response =>{
            setLoggedInUser(null);
            getTheUser(null);
            history.push("/");
        })
    };

    const renderSignupLogin = ()=>{
        return (
            <Nav className="mr-auto">
                <Nav.Link eventKey="1" as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link eventKey="2" as={Link} to="/login">Log in</Nav.Link>
            </Nav>
        );
    };

    const renderUserOptions = ()=>{
        return(
            <Nav className="mr-auto">
                <Nav.Link eventKey="3" as={Link} to="/profile">Profile</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link eventKey="4" onClick={logout}>Log out</Nav.Link>
            </Nav>
        );
    };

    
    return (
        <div className= "Navbar">
            <Navbar collapseOnSelect bg="info" expand="lg" fixed="top">
                <Navbar.Brand>
                    <Link to="/"> 
                        <img className="navbar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Athletics_pictogram.svg" alt="Trackifit" />
                        <p className="logo-text">Trackyfit</p>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {loggedInUser ? renderUserOptions() : renderSignupLogin() }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(NavComp);