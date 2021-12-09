import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import ResultsContext from './resultsContext';
import ResultsReducer from './resultsReducer';
import {
    ADD_RESULT,
    HANDLE_RESULTS_FORM
} from '../../types';

const ResultsState = ({ children }) => {

    const initialState = {
        results: null,
        isResultsFormDisplayed: false
    }

    const [ state, dispatch ] = useReducer(ResultsReducer, initialState);

    const addResult = async (result)=>{
        try {
            const response = await axiosClient.post(result)
            dispatch({
                type: ADD_RESULT,
                payload: response
            });
            handleResultsForm();
            //getExerciseInfo(); //this or push directly the new result in local state?
        } catch (err) {
            console.log(err)
        }
    };

    const handleResultsForm = ()=>{
        dispatch({
            type: HANDLE_RESULTS_FORM
        });
    };



    return (
        <ResultsContext.Provider
            value={{
                results: state.results,
                isResultsFormDisplayed: state.isResultsFormDisplayed,
                addResult,
                handleResultsForm
            }}
        >
            {children}
        </ResultsContext.Provider>
    )

};

export default ResultsState;