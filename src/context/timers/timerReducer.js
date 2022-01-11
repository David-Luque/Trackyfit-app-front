import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME
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
        default:
            return state;
    };
};

export default TimerReducer;