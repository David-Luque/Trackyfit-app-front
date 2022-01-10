import { useReducer } from 'react';
import TimerContext from './timerContext';
import TimerReducer from './timerReducer';

const TimerState = ({ children })=>{

    const initialState = {
        timer: 0,
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


    // const startTime = () => {
    //     const timerInterval = setInterval(()=>{
    //         currentTime++;
    //     }, 10);
    //     intervalId = timerInterval;
    // };

    // const stopTime = () => {
    //     clearInterval(intervalId);
    // };

    // const resetTime = () => {
    //     currentTime = 0;
    // };

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
        //const seconds = Math.floor(remainingTime / 100);
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
            return strNumber;
        }
    };


    return (
        <TimerContext.Provider
            value={{

            }}
        >
            { children }
        </TimerContext.Provider>
    );
};

export default TimerState;