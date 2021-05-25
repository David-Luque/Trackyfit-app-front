import React, { Component } from 'react';
import '../styles/Navbar.css'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserService from '../services/UserService';



class NavComp extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedInUser: null
        };
        this.userService = new  UserService();
    };

    componentWillReceiveProps(nextProps){
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
    };


    logout = ()=>{
        this.userService.logout()
        .then(response =>{
            console.log(response)
            this.setState({ loggedInUser: null });
            this.props.getTheUser(null);
            this.props.history.push("/");
        })
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
                <Nav.Link eventKey="4" onClick={this.logout}>Log out</Nav.Link>
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

export default withRouter(NavComp);