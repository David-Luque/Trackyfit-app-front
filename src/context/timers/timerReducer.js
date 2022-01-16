import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME,
    SET_AMRAP_TIME,
    ADD_AMRAP_SET,
    REMOVE_AMRAP_SET,
    EDIT_AMRAP_SET
} from '../../types'

const TimerReducer = (state, action)=>{
    switch(action.type) {
        case SAVE_INTERVAL:
            return {
                ...state,
                intervalID: action.payload
            }
        case COUNT_TIME:
            return {
                ...state,
                timer: state.timer++
            }
        case STOP_INTERVAL:
            return clearInterval(state.intervalID);
            //return state;
        case RESET_TIME:
            return {
                ...state,
                timer: 0
            }
        case SET_AMRAP_TIME:
            return {
                ...state,
                amrap_time: action.payload
            }
        case ADD_AMRAP_SET:
            return {
                ...state,
                amrap_sets: [...state.amrap_sets, action.payload]
            };
        case REMOVE_AMRAP_SET:
        case EDIT_AMRAP_SET:
            return {
                ...state,
                amrap_sets: action.payload
            };
        default:
            return state;
    };
};

export default TimerReducer;