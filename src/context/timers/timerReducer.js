import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME,
    SET_TIMER_READY,
    SET_END_SESSION,
    SET_TIME_REFERENCES,
    HANDLE_COUNTDOWN,
    HANDLE_REST,
    HANDLE_SESSION_END,
    HANDLE_SESSION_PAUSED,
    HANDLE_PAUSE_DATA,
    ADD_USER_ROUND,
    RESET_TIMER_STATE
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
        case HANDLE_SESSION_PAUSED:
            return {
                ...state,
                isSessionPaused: action.payload
            }
        case HANDLE_PAUSE_DATA:
            return {
                ...state,
                pauseData: action.payload
            }
        case ADD_USER_ROUND:
            return {
                ...state,
                userRounds: state.userRounds + 1
            }
        case RESET_TIMER_STATE:
            return action.payload
        default:
            return state;
    };
};

export default TimerReducer;