import { useReducer } from 'react';
import TimerContext from './timerContext';
import TimerReducer from './timerReducer';
import {
    SAVE_INTERVAL,
    COUNT_TIME,
    STOP_INTERVAL,
    RESET_TIME
} from '../../types';

const TimerState = ({ children })=>{

    const initialState = {
        timer: 0,
        intervalID: null,
        sets: null,
        rest: null,
        amrap_time: null,
        amrap_sets: null, //an arary of objects with rest and time for every set
        forTime_timeCap: 0,
        emom_every: 0,
        emom_for: 0,
        asLongAsPossible: false,
        tabata_rounds: 0,
        tabata_workTime: 0,
        tabata_restTime: 0
    }

    const [ state, dispatch ] = useReducer(TimerReducer, initialState);


    const startTime = () => {
        const saveInterval = (int)=>{
            dispatch({
                type: SAVE_INTERVAL,
                payload: int
            });
        }; 

        const timerInterval = setInterval(()=>{
            dispatch({
                type: COUNT_TIME
            });
        }, 10);

        saveInterval(timerInterval);
    };

    const stopTime = () => {
        dispatch({
            type: STOP_INTERVAL
        });
    };

    const resetTime = () => {
        dispatch({
            type: RESET_TIME
        });
    };

    const splitTimeToSecs = (time) => {
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


    return (
        <TimerContext.Provider
            value={{
                timer: state.timer,
                intervalID: state.intervalID,
                sets: state.sets,
                rest: state.rest,
                amrap_time: state.amrap_time,
                amrap_sets: state.amrap_sets,
                forTime_timeCap: state.forTime_timeCap,
                emom_every: state.emom_every,
                emom_for: state.emom_for,
                asLongAsPossible: state.asLongAsPossible,
                tabata_rounds: state.tabata_rounds,
                tabata_workTime: state.tabata_workTime,
                tabata_restTime: state.tabata_restTime,
                startTime,
                stopTime,
                resetTime,
                splitTimeToSecs,
                splitTimeToMillisecs,
                getTimeOptions
            }}
        >
            { children }
        </TimerContext.Provider>
    );
};

export default TimerState;