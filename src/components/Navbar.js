import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';



class NavComp extends React.Component {

    state = {
        loggedInUser: this.props.loggedInUser
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["loggedInUser"]})
      }

    
    render(){
        return (
            <div className= "Navbar">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <Link to="/"> 
                            <img className="navbar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Athletics_pictogram.svg" alt="Trackifit" /> 
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {!this.state.loggedInUser && <Nav.Link><Link to="/signup">Sign Up</Link></Nav.Link>}
                            {!this.state.loggedInUser && <Nav.Link><Link to="/login">Log in</Link></Nav.Link>}

                            {this.state.loggedInUser && <Nav.Link><Link to="/user-profile">Profile</Link></Nav.Link>}
                            <NavDropdown.Divider />
                            {this.state.loggedInUser && <Nav.Link onClick={()=>this.props.logOut()}>Log out</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
	    );
    }
    
}

export default NavComp;