import React from 'react'
import UserService from '../services/UserService'
import '../styles/UserProfile.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class UserProfile extends React.Component{

  state = {
    userLogged: null
  }

  service = new UserService()


  componentDidMount(){
    this.service.getUser(this.props.loggedInUser._id)
    .then((response)=>{
      console.log(response)
      this.setState({userLogged: response})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render(){
    return(
      <div className="UserProfile">
        <h2>Welcome {this.props.loggedInUser.username}</h2>
        <div className="user-info-buttons">
        <Button variant="info">
          <Link to="/all-exercises">My performance</Link>
        </Button>
        <br />
        <Button variant="info">
          <Link to="/details-metrics">My metrics</Link>
        </Button>
        </div>
      </div>
    )    
  }
}

export default UserProfile