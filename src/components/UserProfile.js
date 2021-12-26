import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/auth/authContext';
import '../styles/UserProfile.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const UserProfile = () => {

  const authContext = useContext(AuthContext);
  const { user, authenticateUser } = authContext;


  useEffect(()=>{
    authenticateUser();
  }, []);


  return(
    <div className="profile">
      <h2 className="profile__title"> Welcome {user.username} </h2>
      <div className="profile__info-buttons">
        <Link to="/all-exercises">
          <Button variant="info"> Exercises </Button>
        </Link>
        <br />
        <Link to="/all-metrics">
          <Button variant="info"> Metrics </Button>
        </Link>
        <br />
        <Link to="/all-workouts">
          <Button variant="info"> Workouts </Button>
        </Link>
      </div>
    </div>
  )    
}

export default UserProfile