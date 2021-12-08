import React,  { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, user, ...rest })=>{
    
    const authContext = useContext(AuthContext);
    const { authenticated, loading, authenticateUser } = authContext;
    
    useEffect(()=>{
        authenticateUser()
    }, []);
    
    return(
        <Route {...rest} render={(props) => {
            if(!authenticated && !loading){
                return <Component {...props} />
            } else {
                return <Redirect to={{pathname: "/", state: {from: props.location}}} />
            }
        }}
        />
    );
};

export default PrivateRoute;