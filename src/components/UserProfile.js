import React from 'react'
import UserService from '../services/UserService'
import '../styles/UserProfile.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class UserProfile extends React.Component{

  state = {
    loggedInUser: null
  };

  userService = new UserService();

  componentDidMount = ()=>{
    this.userService.loggedIn()
    .then((response)=>{
      this.setState({loggedInUser: response});
    })
    .catch(err => console.log(err))
  };

  render(){
    return(
      <div className="UserProfile">
        <h2>Welcome {this.props.loggedInUser.username}</h2>
        <div className="user-info-buttons">
          <Link to="/details-workout">
            <Button variant="info">My performance</Button>
          </Link>
          <br />
          <Link to="/details-metrics">
            <Button variant="info">My metrics</Button>
          </Link>
        </div>
      </div>
    )    
  }
}

export default UserProfile