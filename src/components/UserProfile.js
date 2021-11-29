import React, { useState, useEffect } from 'react'
import UserService from '../services/UserService'
import '../styles/UserProfile.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const UserProfile = ({ loggedInUser }) => {

  const [ _loggedInUser, set_LoggedInUser ] = useState(null);

  const userService = new UserService();

  useEffect(()=>{
    userService.loggedIn()
    .then((response)=>{
      set_LoggedInUser(response);
    })
    .catch(err => console.log(err))
  }, []);


  return(
    <div className="UserProfile">
      <h2>Welcome {loggedInUser.username}</h2>
      <div className="user-info-buttons">
        <Link to="/all-exercises">
          <Button variant="info"> My exercises </Button>
        </Link>
        <br />
        <Link to="/all-metrics">
          <Button variant="info"> My metrics </Button>
        </Link>
        <br />
        <Link to="/workouts">
          <Button variant="info"> My workouts </Button>
        </Link>
      </div>
    </div>
  )    
}

export default UserProfile