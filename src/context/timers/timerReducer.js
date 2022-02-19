import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME,
    SET_AMRAP_TIME,
    ADD_AMRAP_SET,
    REMOVE_AMRAP_SET,
    EDIT_AMRAP_SET,
    SET_TIMER_READY,
    SET_END_SESSION,
    SET_TIME_REFERENCES,
    HANDLE_COUNTDOWN,
    HANDLE_REST,
    HANDLE_SESSION_END
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
                timer: state.timer + 1
            }
        case STOP_INTERVAL:
            return {
                ...state,
                intervalID: ''
            };
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
        case SET_TIMER_READY:
            return {
                ...state,
                isTimerReady: true
            }
        case SET_END_SESSION:
            return {
                ...state,
                isEndSession: true
            }
        case SET_TIME_REFERENCES:
            return {
                ...state,
                timersRef: action.payload
            }
        case HANDLE_COUNTDOWN:
            return {
                ...state,
                isCountDownDone: action.payload
            }
        case HANDLE_REST:
        return {
            ...state,
            isOnRest: action.payload
        }
        case HANDLE_SESSION_END:
        return {
            ...state,
            isSessionEnd: action.payload
        }
        default:
            return state;
    };
};

export default TimerReducer;