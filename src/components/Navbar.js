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
            <Navbar.Brand><Link to="/">Trackifit </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {!this.state.loggedInUser && <Nav.Link to="/signup"><Link to="/signup">Sign Up</Link></Nav.Link>}
                {!this.state.loggedInUser && <Nav.Link><Link to="/login">Log in</Link></Nav.Link>}

                {this.state.loggedInUser && <Nav.Link><Link to="/user-profile">Profile</Link></Nav.Link>}
                <NavDropdown.Divider />
                {this.state.loggedInUser && <Nav.Link onClick={()=>this.props.logOut()}>Log out</Nav.Link>}
                
                
                {/* {this.state.loggedInUser && <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item ><Link to="/user-profile">Profile</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>this.props.logOut()}>Log out</NavDropdown.Item>
                </NavDropdown> } */}
                </Nav>
            </Navbar.Collapse>
            </Navbar>

            


                {/* <nav className="Navbar">
                    <Link to="/">Home Page</Link>
                    <br />

                    
                    
                    <div>
                        {!this.state.loggedInUser && <Link to="/signup">Sign Up</Link>}
                        <br />
                        {!this.state.loggedInUser && <Link to="/login">Log In</Link>}
                    </div>
                    
                    <div>
                        {this.state.loggedInUser && <Link to="/user-profile">Profile</Link>}
                        <br />
                        {this.state.loggedInUser && <button onClick={()=>this.props.logOut()}>Log Out</button>}
                    </div>
                </nav> */}
            </div>
	    );
    }
    
}

export default NavComp;