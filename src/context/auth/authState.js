import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    SIGNUP_USER
} from '../../types';

const AuthState = ({ children })=>{

    const initialState = {
        user: null,
        authenticated: null
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)

    // signup = (username, password) => {
    //     return this.service.post("/signup", {username, password})
    //     .then(response => response.data)
    //   }
    const signup = async (username, password)=>{
        try {
            const response = await axiosClient.post('/signup', { username, password });
            dispatch({
                type: SIGNUP_USER,
                payload: response
            })
        } catch(err) {
            console.log(err)
        }
        
    };


        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    authenticated: state.authenticated,
                    signup
                }}
            >
                {children}
            </AuthContext.Provider>
        )

};

export default AuthState;