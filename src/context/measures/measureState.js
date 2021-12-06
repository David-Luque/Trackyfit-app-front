import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import MeasureContext from './measureContext';
import MeasureReducer from './measureReducer';
import {
    ADD_MEASURE
} from '../../types';

const MeasureState = ({ children }) => {

    const initialState = {
        measures: null
    };

    const [ state, dispatch ] = useReducer(MeasureReducer, initialState);


    const addMeasure = async (measure) => {
        try {
            const response = await axiosClient.post('/mesaure', measure);
            dispatch({
                type: ADD_MEASURE,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };



    return (
        <MeasureContext.Provider
            value={{
                measures: state.measures,
                addMeasure
            }}
        >
            {children}
        </MeasureContext.Provider>
    );

};

export default MeasureState;