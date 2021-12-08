import {
    SIGNUP_USER,
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../../types';

const AuthReducer = (action, state)=>{
    switch(action.type) {
        case SIGNUP_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER:
            return state
        case AUTH_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
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