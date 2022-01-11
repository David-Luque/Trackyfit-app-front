//TODO: CONVERT EVERYTHING TO SECONDS AS BASE UNIT

// class Timer {
//     constructor() {
//         currentTime = 0;
//         intervalId = null;
//     }

    // export const startTime = () => {
    //     const timerInterval = setInterval(()=>{
    //         currentTime++;
    //     }, 10);
    //     intervalId = timerInterval;
    // };

    // export const stopTime = () => {
    //     clearInterval(intervalId);
    // };

    // export const resetTime = () => {
    //     currentTime = 0;
    // };

    // export const splitTimeToSecs = (time) => {
    //     const minutes = twoDigitsNumber( getMinutes(time) );
    //     const seconds = twoDigitsNumber( getSeconds(time) );
    //     return `${minutes}:${seconds}`;
    // };

    // export const splitTimeToMillisecs = (time) => {
    //     const minutes = twoDigitsNumber( getMinutes(time) );
    //     const seconds = twoDigitsNumber( getSeconds(time) );
    //     const milliseconds = twoDigitsNumber( getMilliseconds(time) );
    //     return `${minutes}:${seconds}:${milliseconds}`;
    // };

    // export const getMinutes = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     return minutes;
    // };

    // export const getSeconds = (time) => {
    //     const minutes = getMinutes(time);
    //     const seconds = time - minutes * 60;
    //     //const seconds = Math.floor(remainingTime / 100);
    //     return seconds;
    // };

    // export const getMilliseconds = (time) => {
    //     const minutes = getMinutes(time);
    //     const seconds = getSeconds(time);
    //     const remainingTime = time - (minutes * 60 + seconds);
    //     const milliseconds = remainingTime * 100;
    //     return milliseconds;
    // };

    // export const twoDigitsNumber = (number) => {
    //     const strNumber = number.toString();
    //     if(strNumber.length < 2) {
    //         return `0${strNumber}`;
    //     } else {
    //         return strNumber;
    //     }
    // };
//};

//export default Timer;