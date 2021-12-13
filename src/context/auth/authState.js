import React, { useReducer } from 'react';
import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    SIGNUP_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../../types';

const AuthState = ({ children })=>{

    const initialState = {
        user: null,
        authenticated: false,
        token: null,
        message: null
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)


    const userSignup = async (username, password)=>{
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

    const userLogin = async (user)=>{
        try {
            const response = await axiosClient.get('/login', user);
            dispatch({
                type: LOGIN_USER,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };

    const authenticateUser = async ()=>{
        const token = localStorage.getItem('token');
        if(token) {
            authToken(token)
        }
        
        try {
            const response = await axiosClient.get('/loggedin');
            dispatch({
                type: AUTH_USER,
                payload: response
            });
        } catch(err) {
            console.log(err)
        }
    };

    const logout = async ()=>{
        try {
            const response = await axiosClient.post('logout', {})
            dispatch({
                type: LOGOUT_USER,
                payload: response
            });
        } catch (error) {
            
        }
    };


        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    authenticated: state.authenticated,
                    token: state.token,
                    message: state.message,
                    userSignup,
                    userLogin,
                    authenticateUser,
                    logout
                }}
            >
                {children}
            </AuthContext.Provider>
        )

};

export default AuthState;