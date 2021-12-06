import {
    ADD_MEASURE
} from '../../types';

const MeasureReducer = (state, action) => {
    switch(action.type) {
        case ADD_MEASURE:
            return {
                ...state,
                measures: [...state.measures, action.payload]
            }
        default:
            return state;
    }
};

export default MeasureReducer;