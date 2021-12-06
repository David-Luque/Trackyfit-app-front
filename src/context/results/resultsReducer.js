import {
    ADD_RESULT
} from '../../types';

const ResultsReducer = (state, action) => {
    switch(action.type) {
        case ADD_RESULT:
            return {
                ...state,
                results: [...state.result, action.payload] //this or request to server for new data?
            }
        default:
            return state;
    }
};

export default ResultsReducer;