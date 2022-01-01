import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';
//import { useHistory } from 'react-router-dom';



const NavComp = (props) => {

    const authContext = useContext(AuthContext);
    const { user, authenticated, authenticateUser, logout } = authContext;

    useEffect(()=>{
        authenticateUser();
    }, []);


    const logoutSession = ()=>{
        logout()
        props.history.push("/");
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
                <Nav.Link eventKey="3" as={Link} to="/profile">{`${user.username} profile`}</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link eventKey="4" onClick={logoutSession}>Log out</Nav.Link>
            </Nav>
        );
    };

    
    return (
        <div className= "navbar">
            <Navbar collapseOnSelect bg="info" expand="lg" fixed="top">
                <Navbar.Brand>
                    <Link to="/"> 
                        <img className="navbar__image" src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Athletics_pictogram.svg" alt="Trackifit" />
                        <p className="navbar__logo-text">Trackyfit</p>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {authenticated ? renderUserOptions() : renderSignupLogin() }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(NavComp);