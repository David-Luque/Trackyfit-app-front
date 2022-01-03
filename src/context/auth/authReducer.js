import {
    SIGNUP_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../../types';

const AuthReducer = (action, state)=>{
    switch(action.type) {
        case SIGNUP_USER:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case LOGIN_USER:
            return state
        case AUTH_USER:
            console.log('AUTHENTICATED REDUCER_4 !!!')
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                authenticated: false,
                token: null
            }
        
        default:
            return state;
    }
};

export default AuthReducer;