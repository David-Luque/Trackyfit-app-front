class Timer {
    constructor() {
        this.currentTime = 0;
        this.intervalId = null;
    }

    startTime() {
        const timerInterval = setInterval(()=>{
            this.currentTime++;
        }, 10);
        this.intervalId = timerInterval;
    };

    stopTime() {
        clearInterval(this.intervalId);
    };

    resetTime() {
        this.currentTime = 0;
    };

    splitTime() {};

    getMinutes() {};

    getSeconds() {};

    getMilliseconds() {};

    twoDigitsNumber(number) {};
};

export default Timer;