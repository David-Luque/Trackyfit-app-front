import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import ResultsContext from './resultsContext';
import ResultsReducer from './resultsReducer';
import {
    ADD_RESULT
} from '../../types';

const ResultsState = ({ children }) => {

    const initialState = {
        results: null
    }

    const [ state, dispatch ] = useReducer(ResultsReducer, initialState);

    const addResult = async (result)=>{
        try {
            const response = await axiosClient.post(result)
            dispatch({
                type: ADD_RESULT,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <ResultsContext.Provider
            value={{
                results: state.results,
                addResult
            }}
        >
            {children}
        </ResultsContext.Provider>
    )

};

export default ResultsState;