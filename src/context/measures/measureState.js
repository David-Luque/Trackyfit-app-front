import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import MeasureContext from './measureContext';
import MeasureReducer from './measureReducer';
import {
    ADD_MEASURE,
    HANDLE_MEASURE_FORM
} from '../../types';

const MeasureState = ({ children }) => {

    const initialState = {
        measures: null,
        isMeasureFormDisplayed: false
    };

    const [ state, dispatch ] = useReducer(MeasureReducer, initialState);


    const addMeasure = async (id, measure) => {
        try {
            const response = await axiosClient.post('/mesaure', measure);
            dispatch({
                type: ADD_MEASURE,
                payload: response
            });
            handleMeasureForm();
        } catch (err) {
            console.log(err)
        }
    };

    const handleMeasureForm = ()=>{
        dispatch({
            type: HANDLE_MEASURE_FORM
        });
    };



    return (
        <MeasureContext.Provider
            value={{
                measures: state.measures,
                isMeasureFormDisplayed: state.isMeasureFormDisplayed,
                addMeasure,
                handleMeasureForm
            }}
        >
            {children}
        </MeasureContext.Provider>
    );

};

export default MeasureState;