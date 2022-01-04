import {
    SUCCESS_SIGNUP,
    FAILURE_SIGNUP,
    SUCCESS_LOGIN,
    FAILURE_LOGIN,
    AUTH_USER,
    LOGOUT_USER
} from '../../types';

const AuthReducer = (action, state)=>{
    switch(action.type) {
        case SUCCESS_SIGNUP:
        case SUCCESS_LOGIN:
            console.log('SUCCESS_SIGNUP LOG!');
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                isAuthenticated: true,
                message: null,
                loading: false
            }
        case AUTH_USER:
            console.log('AUTH_USER LOG!');
            console.log(action.payload);
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT_USER:
        case FAILURE_SIGNUP:
        case FAILURE_LOGIN:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isAuthenticated: null,
                token: null,
                loading: false,
                message: action.payload
            }
        
        default:
            return state;
    }
};

export default AuthReducer;