import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimerContext from '../../context/timers/timerContext';
import ForTimeResults from './minor_timer_comp/ForTimeResults';
import ForTimeSets from './minor_timer_comp/ForTimeSets';


const ForTime = ()=>{

    const timerContext = useContext(TimerContext);
    const {
        getTimeOptions,
        isSessionEnd,
        setTimerReady,
        isTimerReady,
        resetState,
        isOnRest,
        timersRef,
        splitTimeToSecs,
        userRounds,
        sumUserRound,
        pauseData,
        isCountDownDone,
        handleCountDownDone,
        countDownTime,
        setTimersRef,
        saveIntervalID,
        intervalID,
        handleIsOnRest,
        isSessionPaused,
        handleIsSessionPaused,
        setPauseData,
        handleIsSessionEnd
    } = timerContext;

    const { currentTime_ref, timer_ref } = timersRef;

    const [ forTimeCap, setForTimeCap ] = useState(0);
    const [ isForTimeSets, setIsForTimeSets ] = useState(false);
    const [ count, setCount ] = useState({ forTime: 1, rest: 1 });
    //const [ allForTimeSets, setAllForTimeSets ] = useState([]);
    const [ userLastTime, setUserLastTime ] = useState(null);
    //const [ userRounds, setUserRounds ] = useState(0);
    const [ sessionSets, setSessionSets ] = useState(3);
    const [ sessionRest, setSessionRest ] = useState(60);
    const [ userRoundsTimes, setUserRoundsTimes ] = useState({});


    useEffect(()=>{ resetState() }, []);


    const renderTimeOptions = (maxMinutes)=>{
        //const maxMinutes = maxMinutes;
        const options = getTimeOptions(maxMinutes);
        
        return (
            <>
                <option value='0' key={-1}> None </option>
                {
                    options.map((op, index) => (
                        <option value={op.value} key={index}>
                            {op.formatValue}
                        </option>
                    ))
                }
            </>
        )
    };

    const renderSessionResume = ()=>{
        console.log('renderSessionResume()')
    };

    const prepareForTime = ()=>{
        setTimerReady();
    };

    const renderForTimeCount = ()=>{
        return (
            <>
                <h3> FOR TIME  { isForTimeSets && <span>{count.forTime} of {sessionSets}</span> } </h3>
                { isOnRest ? (
                    <p>REST</p>
                ) : (
                    forTimeCap !== 0 ? <p> Time cap: {splitTimeToSecs(forTimeCap)} minutes</p> : null 
                )}
            </>
        )
    };
    
    const handleTimer = ()=>{
        const startSession = ()=>{
            let timer, currentTime;
            let forTimeCount;
            let pausedDataLocal;
            if(pauseData) pausedDataLocal = pauseData;

            if(pausedDataLocal) {
                forTimeCount = pausedDataLocal.forTimeCount;
            } else {
                forTimeCount = count.forTime;
            }
            
            const startCountDown = ()=>{
                if(pausedDataLocal) {
                    timer = pausedDataLocal.timer
                    currentTime = pausedDataLocal.currentTime
                    pausedDataLocal = null;
                } else {
                    timer = 0;
                    currentTime = countDownTime;
                }
                
                let countDownIntervalID;
    
                const countDownInterval = setInterval(()=>{
                    timer++;
                    currentTime--;
                    setTimersRef({
                        currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(countDownIntervalID);
                        handleCountDownDone(true);
                        startForTime();
                    }
                }, 1000);
                countDownIntervalID = countDownInterval;
                saveIntervalID(countDownIntervalID);
            };
    
            const startForTime = ()=>{
                handleIsOnRest(false);
                handleRoundsButtonStatus('active');
                
                if(!isSessionPaused) {
                    handleUserTimes();
                } else {
                    handleIsSessionPaused(false)
                }
                
                if(pausedDataLocal) {
                    timer = pausedDataLocal.timer
                    currentTime = pausedDataLocal.currentTime
                    pausedDataLocal = null;
                } else {
                    timer = 0;
                    //currentTime = all_session_amraps[amrap_count] + 1;
                }

                let workIntervalID;
                
                const workInterval = setInterval(()=>{
                    timer++;
                    //currentTime--;
                    setTimersRef({
                        //currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(workIntervalID);
                        forTimeCount++;
                        if(forTimeCount === sessionSets) {
                            return endSession();
                        };
                        handleRoundsButtonStatus('inactive');
                        startRest();
                    }
                }, 1000);
                workIntervalID = workInterval;
                saveIntervalID(workIntervalID);
            };
    
            const startRest = ()=>{
                //console.log('startRest')
                handleIsOnRest(true);
                
                if(pausedDataLocal) {
                    timer = pausedDataLocal.timer;
                    currentTime = pausedDataLocal.currentTime;
                    pausedDataLocal = null;
                } else {
                    timer = 0;
                    //currentTime = session_rests[rest_count] + 1; 
                }

                let restIntervalID;
  
                const restInterval = setInterval(()=>{
                    timer ++
                    //currentTime--;
                    setTimersRef({
                        currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(restIntervalID);
                        //rest_count++;
                        
                        if(count.forTime === sessionSets) {
                            console.log('final round!')
                        } else {
                            console.log('one more set!')
                        };
    
                        setCount({ ...count, amrap: forTimeCount });
                        sumUserRound();
                        startForTime();
                    }
                }, 1000);
                restIntervalID = restInterval;
                saveIntervalID(restIntervalID);
            };
    
            const endSession = ()=>{
                handleIsSessionEnd(true);
            };
    
            if(!isCountDownDone) startCountDown();
            if(isCountDownDone && !isOnRest) startForTime();
            if(isCountDownDone && isOnRest) startRest();
        };

        const pauseSession = ()=>{
            //console.log('pauseSession()')
            clearInterval(intervalID);
            handleIsSessionPaused(true);
            handleRoundsButtonStatus('inactive');
            setPauseData({
                //currentTime: currentTime_ref,
                timer: timer_ref,
                forTimeCount: count.forTime,
                //restCount: count.rest
            });
        };

        const restartSession = ()=>{
            //console.log('restartSession()')
            startSession();
        };

        const timerElem = document.getElementById('timer');
        switch (timerElem.className) {
            case 'inactive':
                timerElem.className = 'active';
                return startSession();
            case 'active':
                timerElem.className = 'paused';
                return pauseSession();
            case 'paused':
                timerElem.className = 'active';
                return restartSession();
            default:
                return console.log('handleTimer switch error')
        }

    };

    const addUserRound = ()=>{
        console.log('addUserRound()')
    };

    const handleForTimeSets = ()=>{
        if(isForTimeSets) {
            setIsForTimeSets(false)
        } else {
            setIsForTimeSets(true)
        }
    };

    const handleRoundsButtonStatus = (status)=>{
        const roundsButton = document.getElementById('round-btn');
        roundsButton.className = status;
    };

    const handleUserTimes = ()=>{
        const userRoundsTimes_copy = userRoundsTimes;
        const userRoundTimes_keys = Object.keys(userRoundsTimes_copy)
        let newRound_value = Number(userRoundTimes_keys[userRoundTimes_keys.length - 1]) + 1;
        if(isNaN(newRound_value)) newRound_value = 0;
        userRoundsTimes_copy[newRound_value.toString()] = [];
        setUserRoundsTimes(userRoundsTimes_copy);
    };





    if(isSessionEnd) { 
        return (
            <div>
                <div>
                    <header>
                        <Link to={'/timer'}> <span>&larr;</span> </Link>
                        <p>app logo-name</p>
                        <div>
                            <button>share</button>
                        </div>
                    </header>
                    <main>
                        {/* <img/> */}
                        <p>Motivation sentence</p>
                        <ul>
                            {renderSessionResume()}
                        </ul>
                    </main>
                    <footer> Show round times</footer>
                    <ForTimeResults />
                </div>
            </div>
        )
    } else if(isTimerReady) {
        return (
            <div>
                { renderForTimeCount() }
                { userLastTime === 0 || userLastTime === null ? (
                    <p>Last round: -:- </p> 
                    ) : <p>Last round: {splitTimeToSecs(userLastTime)}</p> 
                }
                <div>
                    <main id='timer' className="inactive" onClick={()=>handleTimer()}>
                        {/* <img/> */}
                        <h1>{splitTimeToSecs(timer_ref)}</h1>
                        <p>Tap to start</p>
                    </main>
                    <aside>
                        <button id="round-btn" className='inactive' onClick={()=> addUserRound()}> 
                            {userRounds !== 0 ? userRounds : '+'} 
                        </button>
                        <p>Rounds counter</p>
                    </aside>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>FOR TIME</h3>
                
                <p>As fast as posible for time:</p>
                
                <p>Time cap:</p>
                <select 
                    name='time'
                    value={forTimeCap}
                    onChange={ e => setForTimeCap(Number(e.target.value)) }
                > {renderTimeOptions(50)} </select>
                
                { isForTimeSets ? (
                        <ForTimeSets
                            renderTimeOptions={renderTimeOptions}
                            setSessionSets={setSessionSets}
                            setSessionRest={setSessionRest}
                            sessionRest={sessionRest}
                            sessionSets={sessionSets}
                        />
                    ) : (
                        <button
                            onClick={() => handleForTimeSets()}
                        > Add sets (optional) </button>
                    )
                }
                
                <button onClick={()=>prepareForTime()}>
                    START TIME
                </button>
            </div>
        )
    }
};

export default ForTime;