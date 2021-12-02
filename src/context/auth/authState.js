import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    SIGNUP_USER,
    LOGIN_USER,
    LOGGEDIN_USER,
    LOGOUT_USER
} from '../../types';

const AuthState = ({ children })=>{

    const initialState = {
        user: null,
        authenticated: null,
        token: null,
        message: null
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)


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

    const login = async (username, password)=>{
        try {
            const response = await axiosClient.get('/login', { username, password });
            dispatch({
                type: LOGIN_USER,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };

    const loggedIn = async ()=>{
        try {
            const response = await axiosClient.get('/loggedin');
            dispatch({
                type: LOGGEDIN_USER,
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
                    signup,
                    login,
                    loggedIn,
                    logout
                }}
            >
                {children}
            </AuthContext.Provider>
        )

};

export default AuthState;