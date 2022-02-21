import { useReducer } from 'react';
import TimerContext from './timerContext';
import TimerReducer from './timerReducer';
import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME,
    //SET_AMRAP_TIME,
    //ADD_AMRAP_SET,
    //REMOVE_AMRAP_SET,
    //EDIT_AMRAP_SET,
    SET_TIMER_READY,
    SET_END_SESSION,
    HANDLE_COUNTDOWN,
    HANDLE_REST,
    HANDLE_SESSION_END,
    HANDLE_SESSION_PAUSED,
    HANDLE_PAUSE_DATA,
    ADD_USER_ROUND
} from '../../types';

const TimerState = ({ children })=>{

    const initialState = {
        intervalID: '',
        countDownTime: 4,
        userRounds: 0,
        isTimerReady: null,
        timersRef: { currentTime_ref: 0, timer_ref: 0 },
        isCountDownDone: false,
        isOnRest: false,
        isSessionEnd: false,
        isSessionPaused: false,
        pauseData: null,
        userRoundsTime: {},
        //sets: null,
        //rest: null,
        //amrap_time: 60,
        //amrap_sets: [], //an arary of objects with rest and time for every set
        // forTime_timeCap: 0,
        // emom_every: 0,
        // emom_for: 0,
        // asLongAsPossible: false,
        // tabata_rounds: 0,
        // tabata_workTime: 0,
        // tabata_restTime: 0
    }

    const [ state, dispatch ] = useReducer(TimerReducer, initialState);


    const setTimersRef = (times)=>{
        dispatch({
            type: 'SET_TIME_REFERENCES',
            payload: times
        });
    };

    const handleCountDownDone = (status)=>{
        dispatch({
            type: HANDLE_COUNTDOWN,
            payload: status
        });
    };
    const handleIsOnRest = (status)=>{
        dispatch({
            type: HANDLE_REST,
            payload: status
        });
    };
    const handleIsSessionEnd = (status)=>{
        dispatch({
            type: HANDLE_SESSION_END,
            payload: status
        });
    };
    const handleIsSessionPaused = (status)=>{
        dispatch({
            type: HANDLE_SESSION_PAUSED,
            payload: status
        });
    };

    const setPauseData = (data)=>{
        dispatch({
            type: HANDLE_PAUSE_DATA,
            payload: data
        });
    };

    const sumUserRound = ()=>{
        dispatch({
            type: ADD_USER_ROUND
        });
    };

    const setTimerReady = ()=>{
        dispatch({
            type: SET_TIMER_READY 
        });
    };

    const startTime = () => {
        //console.log('startTime()')
        dispatch({
            type: COUNT_TIME
        });
    };

    const saveIntervalID = (id) => {
        dispatch({
            type: SAVE_INTERVAL,
            payload: id
        });
    };

    const stopTime = () => {
        clearInterval(state.intervalID);
        dispatch({
            type: STOP_INTERVAL
        });
    };

    const resetTimer = () => {
        console.log('resetTimer()')
        dispatch({
            type: RESET_TIME
        });
    };

    const setEndSession = ()=>{
        dispatch({
            type: SET_END_SESSION
        });
    };

    const splitTimeToSecs = (time) => {
        if(time === 0) return '00:00';
        const minutes = twoDigitsNumber( getMinutes(time) );
        const seconds = twoDigitsNumber( getSeconds(time) );
        return `${minutes}:${seconds}`;
    };

    const splitTimeToMillisecs = (time) => {
        const minutes = twoDigitsNumber( getMinutes(time) );
        const seconds = twoDigitsNumber( getSeconds(time) );
        const milliseconds = twoDigitsNumber( getMilliseconds(time) );
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    const getMinutes = (time) => {
        const minutes = Math.floor(time / 60);
        return minutes;
    };

    const getSeconds = (time) => {
        const minutes = getMinutes(time);
        const seconds = time - minutes * 60;
        return seconds;
    };

    const getMilliseconds = (time) => {
        const minutes = getMinutes(time);
        const seconds = getSeconds(time);
        const remainingTime = time - (minutes * 60 + seconds);
        const milliseconds = remainingTime * 100;
        return milliseconds;
    };

    const twoDigitsNumber = (number) => {
        const strNumber = number.toString();
        if(strNumber.length < 2) {
            return `0${strNumber}`;
        } else {
            return strNumber.substring(0, 2);
        }
    };

    const getTimeOptions = (maxMinutes)=>{

        const generateOptions = ()=>{
            const timeOptionsMin = []; //in minutes
            let i = 0;
            do {
                i += .5;
                timeOptionsMin.push(i);
            } while (timeOptionsMin[timeOptionsMin.length - 1] <= maxMinutes);
            //convert to seconds
            const timeOptionsSec = timeOptionsMin.map(op => op * 60);
            return timeOptionsSec;
        };
        
        const formatTimeOptions = (options)=>{
            return options.map(opt => splitTimeToSecs(opt));
        }; 

        const compoundTimeOptions = ()=> {
            const options = generateOptions();
            const formatOptions = formatTimeOptions(options);
            let timeData = [];
            
            for(let i = 0; i < options.length - 1; i++) {
                timeData.push({
                    value: options[i],
                    formatValue: formatOptions[i]
                });
            }
            return timeData;
        };

        return compoundTimeOptions();
    };

    // const setAmrapTime = (time)=>{
    //     dispatch({
    //         type: SET_AMRAP_TIME,
    //         payload: Number(time)
    //     });
    // };

    // const addAmrap = ()=>{
    //     let newAmrap;
    //     if(state.amrap_sets.length === 0) {
    //         newAmrap = {
    //             rest: 30,
    //             work: 30,
    //             position: state.amrap_sets.length
    //         }
    //     } else if(state.amrap_sets.length > 0) {
    //         const previousAmrap = state.amrap_sets[state.amrap_sets.length - 1]
    //         newAmrap = {
    //             ...previousAmrap,
    //             position: state.amrap_sets.length
    //         };
    //     };
    //     dispatch({
    //         type: ADD_AMRAP_SET,
    //         payload: newAmrap
    //     });
    // };

    // const removeAmrap = (position)=>{
    //     const amrap_sets_Copy = [...state.amrap_sets];
    //     amrap_sets_Copy.splice(position, 1);
    //     for(let i = 0; i < amrap_sets_Copy.length; i++) {
    //         amrap_sets_Copy[i].position = i;
    //     }
        
    //     dispatch({
    //         type: REMOVE_AMRAP_SET,
    //         payload: amrap_sets_Copy
    //     });
    // };

    // const editAmrapSet = (amrap_set)=>{
    //     const { position } = amrap_set;
    //     const amrap_sets_Copy = [...state.amrap_sets];
    //     amrap_sets_Copy.splice(position, 1, amrap_set)

    //     dispatch({
    //         type: EDIT_AMRAP_SET,
    //         payload: amrap_sets_Copy
    //     });
    // };


    return (
        <TimerContext.Provider
            value={{
                timersRef: state.timersRef,
                intervalID: state.intervalID,
                isTimerReady: state.isTimerReady,
                // forTime_timeCap: state.forTime_timeCap,
                // emom_every: state.emom_every,
                // emom_for: state.emom_for,
                // asLongAsPossible: state.asLongAsPossible,
                // tabata_rounds: state.tabata_rounds,
                // tabata_workTime: state.tabata_workTime,
                // tabata_restTime: state.tabata_restTime,
                isCountDownDone: state.isCountDownDone,
                isOnRest: state.isOnRest,
                isSessionEnd: state.isSessionEnd,
                countDownTime: state.countDownTime,
                pauseData: state.pauseData,
                userRounds: state.userRounds,
                isSessionPaused: state.isSessionPaused,
                startTime,
                saveIntervalID,
                stopTime,
                resetTimer,
                splitTimeToSecs,
                splitTimeToMillisecs,
                getTimeOptions,
                setTimerReady,
                setEndSession,
                setTimersRef,
                handleCountDownDone,
                handleIsOnRest,
                handleIsSessionEnd,
                handleIsSessionPaused,
                setPauseData,
                sumUserRound
            }}
        >
            { children }
        </TimerContext.Provider>
    );
};

export default TimerState;