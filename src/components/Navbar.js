import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserService from '../services/UserService';



class NavComp extends React.Component {

    state = {
        loggedInUser: null
    }

    service = new UserService();

    componentDidMount = (prevProps, PrevState)=>{
        if(this.props.userInSession !== PrevState.loggedInUser){
            this.setState({ loggedInUser: this.props.userInSession });
        }
    };


    renderSignupLogin = ()=>{
        return (
            <Nav className="mr-auto">
                <Nav.Link eventKey="1" as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link eventKey="2" as={Link} to="/login">Log in</Nav.Link>
            </Nav>
        );
    };

    renderUserOptions = ()=>{
        return(
            <Nav className="mr-auto">
                <Nav.Link eventKey="3" as={Link} to="/profile">Profile</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link eventKey="4" onClick={()=>this.service.logOut()}>Log out</Nav.Link>
            </Nav>
        );
    };

    
    render(){
        return (
            <div className= "Navbar">
                <Navbar collapseOnSelect bg="info" expand="lg" fixed="top">
                    <Navbar.Brand>
                        <Link to="/"> 
                            <img className="navbar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Athletics_pictogram.svg" alt="Trackifit" />
                            <p className="logo-text">Trackifit</p> 
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    {this.state.loggedInUser ? this.renderUserOptions() : this.renderSignupLogin() }
                    </Navbar.Collapse>
                </Navbar>
            </div>
	    );
    }
    
}
import UserService from '../services/UserService';

export default NavComp;