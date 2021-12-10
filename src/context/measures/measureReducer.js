import {
    ADD_MEASURE,
    HANDLE_MEASURE_FORM
} from '../../types';

const MeasureReducer = (state, action) => {
    switch(action.type) {
        case ADD_MEASURE:
            return {
                ...state,
                measures: [...state.measures, action.payload]
            }
        case HANDLE_MEASURE_FORM:
            return {
                ...state,
                isMeasureFormDisplayed: !state.isMeasureFormDisplayed
            }
        default:
            return state;
    }
};

export default MeasureReducer;