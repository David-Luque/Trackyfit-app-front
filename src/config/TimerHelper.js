//TODO: CONVERT EVERYTHING TO SECONDS AS BASE UNIT

// class Timer {
//     constructor() {
//         this.currentTime = 0;
//         this.intervalId = null;
//     }

    export const startTime = () => {
        const timerInterval = setInterval(()=>{
            this.currentTime++;
        }, 10);
        this.intervalId = timerInterval;
    };

    export const stopTime = () => {
        clearInterval(this.intervalId);
    };

    export const resetTime = () => {
        this.currentTime = 0;
    };

    export const splitTime = () => {
        const minutes = this.twoDigitsNumber( this.getMinutes() );
        const seconds = this.twoDigitsNumber( this.getSeconds() );
        const milliseconds = this.twoDigitsNumber( this.getMilliseconds() );

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    export const getMinutes = (secs) => {
        const minutes = Math.floor(secs / 60);
        return minutes;
    };

    export const getSeconds = () => {
        const minutes = this.getMinutes();
        const remainingTime = this.currentTime - minutes * 6000;
        const seconds = Math.floor(remainingTime / 100);
        return seconds;
    };

    export const getMilliseconds = () => {
        const minutes = this.getMinutes();
        const seconds = this.getSeconds();
        const milliseconds = this.currentTime - (minutes * 6000 + seconds * 100);
        return milliseconds;
    };

    export const twoDigitsNumber = (number) => {
        const strNumber = number.toString();
        if(strNumber.length < 2) {
            return `0${strNumber}`;
        } else {
            return strNumber;
        }
    };
//};

//export default Timer;