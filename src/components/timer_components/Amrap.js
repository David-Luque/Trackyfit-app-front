import React, { useContext, useState, useEffect } from 'react';
import TimerContext from '../../context/timers/timerContext';
import AmrapSet from './minor_timer_comp/AmrapSet';

const Amrap = ()=>{
    //TODO: include an "useEffect" on every timer_component where execute a fuction to reset "initialState" of TimerContext

    const timerContext = useContext(TimerContext);
    const {
        startTime,
        resetTimer,
        amrap_time,
        setAmrapTime,
        addAmrap,
        removeAmrap,
        amrap_sets,
        editAmrapSet,
        isTimerReady,
        setTimerReady,
        getTimeOptions,
        splitTimeToSecs,
        isEndSession,
        setEndSession
    } = timerContext

    const [ timersRef, setTimersRef ] = useState({ currentTime_ref: 0, timer_ref: 0});
    const { currentTime_ref, timer_ref } = timersRef;

    const [ count, setCount ] = useState({ amrap: 0, rest: 0 });
    const [ pausedData, setPausedData ] = useState(null);
    const [ intervalID, setIntervalID ] = useState('');
    const [ isCountDownDone, setIsCountDownDone ] = useState(false);
    const [ isOnRest, setIsOnRest ] = useState(false);
    const [ isSessionEnd, setIsSessionEnd ] = useState(false);

    const [ amrapState, setAmrapState] = useState({
        session_amrap: 0,
        session_sets: [],
        all_session_amraps: [],
        session_rests: [],
        countDownTime: 4,
        userRounds: 0,
        userRoundsTimes: [],
        userLastTime: null,
        amrapInterval: ''
    });
    const { 
        session_sets, 
        session_amrap,
        all_session_amraps,
        countDownTime,
        session_rests,
        userRounds,
        userRoundsTimes,
        userLastTime,
        amrapInterval
    } = amrapState;


    useEffect(()=>{
        if(amrap_sets.length > 0) {
            const session_amrap_sets = amrap_sets.map(amrap => amrap.work);
            const session_amrap_rests = amrap_sets.map(amrap => amrap.rest);
            setAmrapState({
                ...amrapState,
                session_sets: session_amrap_sets,
                session_rests: session_amrap_rests
            })
        } else {
            setAmrapState({
                ...amrapState,
                session_amrap: amrap_time,
                session_sets: [],
                all_session_amraps: [],
                session_rests: []
            });
        }
    }, [amrap_time, amrap_sets]);


    const renderTimeOptions = (maxMinutes)=>{
        const max_minutes = maxMinutes;
        const options = getTimeOptions(max_minutes);
        
        return (
            <>
                <option value={0} key={-1}> --- </option>
                {
                    options.map((op, index) => {
                        return (
                            <option value={op.value} key={index}>
                                {op.formatValue}
                            </option>
                        )
                    })
                }
            </>
        );        
    };

    const renderAmraps = ()=>{
        return amrap_sets.map((amrap, index) => (
            <AmrapSet 
                key={index}
                amrap={amrap}
                removeAmrap={removeAmrap}
                editAmrapSet={editAmrapSet}
                getTimeOptions={getTimeOptions}
                splitTimeToSecs={splitTimeToSecs}
            />
        ));
    };

    const renderTotalTime = ()=>{
        const workTotalTime = amrap_sets.reduce((acc, current) => {
            return acc + current.work;
        }, 0);
        const restTotalTime = amrap_sets.reduce((acc, current)=>{
            return acc + current.rest
        }, 0);
        const totalTime = amrap_time + workTotalTime + restTotalTime; 
        return splitTimeToSecs(totalTime);
    };
    
    const renderAmrapCount = ()=>{
        if(session_sets.length > 0) {
            return (
                <>
                    <h3>AMRAP {count.amrap + 1} of {all_session_amraps.length}</h3>
                    { isOnRest ? (
                        <p>REST</p>
                    ) : (
                        <p>{splitTimeToSecs(all_session_amraps[count.amrap])} minutes</p>
                    )}
                </>
            )
        } else {
            return (
                <>
                    <h3>AMRAP</h3>
                    <p>{splitTimeToSecs(all_session_amraps[count.amrap])} minutes</p>
                </>
            )
        }
    };
    
    const renderUserRounds = ()=>{
        if(userRounds === 0) {
            return (
                <span>+</span>
            );
        } else {
            return(
                <span>{userRounds}</span>
            )
        }
    };

    const prepareAmrap = ()=>{
        // setAmrapState({
        //     ...amrapState,
        //     current_amrap_count: 0,
        //     current_rest_count: 0
        // });

        if(session_sets) {
            setAmrapState({
                ...amrapState,
                all_session_amraps: [session_amrap, ...session_sets]
            });
        } else {
            setAmrapState({
                ...amrapState,
                all_session_amraps: [session_amrap]
            });
        }
        
        setTimerReady();
    };

    const addUserRound = ()=>{
        const userPrevTimesTotal = userRoundsTimes.reduce((acc, curr)=>{
            return acc + curr
        }, 0);
        const actualAmrapTime = all_session_amraps[count.amrap];
        const remainingTime = currentTime_ref;
        
        const lastTime =  actualAmrapTime - remainingTime - userPrevTimesTotal;
        
        setAmrapState({
            ...amrapState,
            userRounds: userRounds + 1,
            userLastTime: lastTime,
            userRoundsTimes: [ ...userRoundsTimes, lastTime ]
        });
    };


    const handleTimer = ()=>{

        const startSession = ()=>{
            let timer, currentTime;
            let amrap_count, rest_count;

            if(pausedData) {
                amrap_count = pausedData.amrapCount;
                rest_count = pausedData.restCount;
                //setPausedData(null);
            } else {
                amrap_count = count.amrap;
                rest_count = count.rest;
            }
            
            const startCountDown = ()=>{
                console.log('startCountDown')
                if(pausedData) {
                    timer = pausedData.timer
                    currentTime = pausedData.currentTime
                } else {
                    timer = 0;
                    currentTime = countDownTime;
                }

                pausedData ? setPausedData('') : console.log('clean pausedData');
                console.log(`Pause data in countdown: ${pausedData}`)
                
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
                        setIsCountDownDone(true);
                        startAmrap();
                    }
                }, 1000);
                countDownIntervalID = countDownInterval;
                setIntervalID(countDownIntervalID);
            };
    
            const startAmrap = ()=>{
                console.log('startAmrap')
                setIsOnRest(false);
                
                console.log(`Pause data in startAmrap; ${pausedData}`);
                if(pausedData) {
                    console.log('pausedData')
                    timer = pausedData.timer
                    currentTime = pausedData.currentTime
                    setPausedData(null);
                    console.log(`Pause data in startAmrap; ${pausedData}`);
                } else {
                    console.log('NO pausedData')
                    timer = 0;
                    currentTime = all_session_amraps[amrap_count] + 1;
                }

                let workIntervalID;
                
                const workInterval = setInterval(()=>{
                    timer++;
                    currentTime--;
                    setTimersRef({
                        currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(workIntervalID);
                        amrap_count++;
                        if(!all_session_amraps[amrap_count]) {
                            return endSession();
                        };
                        startRest();
                    }
                }, 1000);
                workIntervalID = workInterval;
                setIntervalID(workIntervalID);
            };
    
            const startRest = ()=>{
                console.log('startRest')
                setIsOnRest(true);
                
                if(pausedData) {
                    timer = pausedData.timer;
                    currentTime = pausedData.currentTime;
                    setPausedData(null);
                } else {
                    timer = 0;
                    currentTime = session_rests[rest_count] + 1; 
                }
  
                const restInterval = setInterval(()=>{
                    timer ++
                    currentTime--;
                    setTimersRef({
                        currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(amrapInterval);
                        rest_count++;
                        
                        if(!session_rests[rest_count]) {
                            console.log('final round!')
                        } else {
                            console.log('one more set!')
                        };
    
                        setCount({ amrap: amrap_count, rest: rest_count });
                        startAmrap();
                    }
                }, 1000);
                setAmrapState({ ...amrapState, amrapInterval: restInterval });
            };
    
            const endSession = ()=>{
                setIsSessionEnd(true);
            };
    
            if(!isCountDownDone) startCountDown();
            if(isCountDownDone && !isOnRest) startAmrap();
            if(isCountDownDone && isOnRest) startRest();
        };

        const pauseSession = ()=>{
            console.log('pauseSession()')
            clearInterval(intervalID);
            setPausedData({
                currentTime: currentTime_ref,
                timer: timer_ref,
                amrapCount: count.amrap,
                restCount: count.rest
            });
        };

        const restartSession = ()=>{
            console.log('restartSession()')
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


    if(isSessionEnd) { 
        return (
            <div>
                <div>
                    <header>
                        <span> back arrow</span>
                        <p>app logo-name</p>
                        <div>actions buttons</div>
                    </header>
                    <main>
                        <img/>
                        <p>Motivation sentence</p>
                        <div>
                            <span>amraps</span>
                            <span>time</span>
                        </div>
                    </main>
                    <footer> View amrap times</footer>
                </div>
            </div>
        )
    } else if(isTimerReady) {
        return (
            <div>
                { renderAmrapCount() }
                { userLastTime && 
                    <p>Last round: {splitTimeToSecs(userLastTime)}</p> 
                }
                <div>
                    <main id='timer' className="inactive" onClick={()=>handleTimer()}>
                        {/* <img/> */}
                        <h1>{splitTimeToSecs(currentTime_ref)}</h1>
                        <p>Tap to start</p>
                    </main>
                    <aside>
                        <p onClick={()=> addUserRound()}>
                            { renderUserRounds() }
                        </p>
                        <p>round counter</p>
                    </aside>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>AMRAP</h3>
                
                <p>As many rounds as posible in:</p>
                
                <select 
                    name='time'
                    value={session_amrap}
                    onChange={(e)=>setAmrapTime(e.target.value)}
                > {renderTimeOptions(10)} </select>
                <p>minutes</p>
                
                { amrap_sets.length > 0 && renderAmraps() }
                
                <button
                    onClick={addAmrap}
                > Adds multiple AMRAPs </button>
                
                <button onClick={()=>prepareAmrap()}>
                    START
                </button>
                
                <p>Total time: {renderTotalTime()}</p>
            </div>
        )
    }
    
};

export default Amrap;