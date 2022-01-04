import React, { useReducer } from 'react';
import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    SUCCESS_SIGNUP,
    FAILURE_SIGNUP,
    AUTH_USER,
    SUCCESS_LOGIN,
    FAILURE_LOGIN,
    LOGOUT_USER,
} from '../../types';

const AuthState = ({ children })=>{

    const initialState = {
        user: null,
        isAuthenticated: null,
        token: localStorage.getItem('token'),
        message: null,
        loading: true
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)


    const userSignup = async (user)=>{
        try {
            const response = await axiosClient.post('/api/auth/signup', user );
            dispatch({
                type: SUCCESS_SIGNUP,
                payload: response.data.token
            });
            authenticateUser();
        } catch(err) {
            const alert = {
                msg: err.response.data.msg,
                category: 'alert-error'
            };
            dispatch({
                type: FAILURE_SIGNUP,
                payload: alert
            });
        }
        
    };

    const authenticateUser = async ()=>{
        const token = localStorage.getItem('token');
        if(token) {
            authToken(token)
            //eslint-disable-next-line
        }
        
        try {
            console.log('AUTHENTICATED REDUCER_2 !!!')
            const response = await axiosClient.get('/api/auth/loggedin');
            console.log(response)
            console.log('AUTHENTICATED REDUCER_3 !!!')
            dispatch({
                type: AUTH_USER,
                payload: response.data.user
            });
        } catch(err) {
            console.log(err.response);
            dispatch({
                type: FAILURE_LOGIN
            });
        }
    };

    const userLogin = async (user)=>{
        try {
            const response = await axiosClient.get('/api/auth/login', user);
            dispatch({
                type: SUCCESS_LOGIN,
                payload: response.data
            });
            authenticateUser();

        } catch (err) {
            console.log(err.response);

            let alert;
            if(err.response.data.msg) {
                alert =  {
                    msg: err.response.data.msg,
                    category: 'alert-error'
                };
            } else {
                alert = {
                    msg: err.response.data.errors[0].msg,
                    category: 'alert-error'
                }
            }
            dispatch({
                type: FAILURE_LOGIN,
                payload: alert
            });
        }
    }; 

    const logout = async ()=>{
        dispatch({
            type: LOGOUT_USER
        });
    };


        return (
            <AuthContext.Provider
                value={{
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
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