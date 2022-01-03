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
        authenticated: null,
        token: localStorage.getItem('token'),
        message: null,
        loading: true
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)


    const userSignup = async (user)=>{
        try {
            const response = await axiosClient.post('/api/auth/signup', user );
            //console.log(response)
            dispatch({
                type: SIGNUP_USER,
                payload: response.data
            })
            authenticateUser();
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
        console.log('AUTHENTICATED REDUCER_1 !!!')
        const token = localStorage.getItem('token');
        if(token) {
            authToken(token)
        }
        
        try {
            console.log('AUTHENTICATED REDUCER_2 !!!')
            const response = await axiosClient.get('/api/auth/loggedin');
            console.log('AUTHENTICATED REDUCER_3 !!!')
            console.log(response)
            dispatch({
                type: AUTH_USER,
                payload: response.data.user
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
                    loading: state.loading,
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