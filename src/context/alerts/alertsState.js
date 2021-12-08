import React, { useReducer } from "react";
import AlertContext from './alertsContext';
import AlertReducer from './alertsReducer';
import {
    SET_ALERT
} from '../../types';

const AlertState = ({ children })=>{


    const initialState = {
        alert: null
    }

    const alertReducer = useReducer(AlertReducer, initialState)
    const [ state, dispatch ] = alertReducer;


    const setAlert = (alert)=>{
        dispatch({
            type: SET_ALERT,
            payload: alert
        });
    };


    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                setAlert
            }}
        >
            { children }
        </AlertContext.Provider>
    )
};

export default AlertState;