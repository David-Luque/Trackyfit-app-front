import {
    ADD_RESULT,
    HANDLE_RESULTS_FORM
} from '../../types';

const ResultsReducer = (state, action) => {
    switch(action.type) {
        case ADD_RESULT:
            return {
                ...state,
                results: [...state.result, action.payload] //this or request to server for new data?
            }
        case HANDLE_RESULTS_FORM:
            return {
                ...state,
                isResultsFormDisplayed: !state.isResultsFormDisplayed
            }
        default:
            return state;
    }
};

export default ResultsReducer;