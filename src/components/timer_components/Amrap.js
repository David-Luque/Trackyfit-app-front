import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimerContext from '../../context/timers/timerContext';
import AmrapSet from './minor_timer_comp/AmrapSet';
import AmrapTimes from './minor_timer_comp/AmrapTimes';

//TODO: fix bug on sets when timer is paused on rest time.
//TODO: fix isSessionPaused on rest

const Amrap = ()=>{

    const timerContext = useContext(TimerContext);
    const {
        isTimerReady,
        setTimerReady,
        getTimeOptions,
        splitTimeToSecs,
        timersRef,
        setTimersRef,
        intervalID,
        saveIntervalID,
        isCountDownDone,
        isOnRest,
        isSessionEnd,
        handleCountDownDone,
        handleIsOnRest,
        handleIsSessionEnd,
        countDownTime,
        isSessionPaused,
        handleIsSessionPaused,
        pauseData,
        setPauseData,
        userRounds,
        sumUserRound,
        resetState
    } = timerContext
    
    const { currentTime_ref, timer_ref } = timersRef;
    
    const [ amrap_time, setAmrap_time ] = useState(60);
    const [ amrap_sets, setAmrap_sets ] = useState([]);
    const [ count, setCount ] = useState({ amrap: 0, rest: 0 });
    const [ userRoundsTimes, setUserRoundsTimes ] = useState({});

    const [ amrapState, setAmrapState] = useState({
        session_amrap: 0,
        session_sets: [],
        all_session_amraps: [],
        session_rests: [],
        userLastTime: null
    });
    const { 
        session_sets, 
        session_amrap,
        all_session_amraps,
        session_rests,
        userLastTime
    } = amrapState;

    useEffect(() => { resetState() }, []);
    useEffect(()=>{
        if(amrap_sets.length > 0) {
            const session_amrap_sets = amrap_sets.map(amrap => amrap.work);
            const session_amrap_rests = amrap_sets.map(amrap => amrap.rest);
            setAmrapState({
                ...amrapState,
                session_amrap: amrap_time,
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
                <option value="defaultValue disabled" key={-1}> --- </option>
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

    const addUserRound = ()=>{
        const roundsButton = document.getElementById('round-btn');
        if(roundsButton.className === 'active') {
            console.log('addUserRound()')
            const userTimes_copy = userRoundsTimes[count.amrap.toString()];

            const userPrevTimesTotal = userTimes_copy.reduce((acc, curr)=>{
                return acc + curr
            }, 0);
            const actualAmrapTime = all_session_amraps[count.amrap];
            const remainingTime = currentTime_ref;
            const lastTime =  actualAmrapTime - remainingTime - userPrevTimesTotal
            
            userTimes_copy.push(lastTime);
            
            setUserRoundsTimes({
                ...userRoundsTimes,
                [count.amrap.toString()] : userTimes_copy
            });
            setAmrapState({
                ...amrapState,
                userLastTime: lastTime
            })
            sumUserRound()
        }
    };

    const prepareAmrap = ()=>{
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

    const handleUserAmrapTimes = ()=>{
        console.log('handleUserAmrapTimes()')
        const userRoundsTimes_copy = userRoundsTimes;
        const userRoundTimes_keys = Object.keys(userRoundsTimes_copy)
        let newRound_value = Number(userRoundTimes_keys[userRoundTimes_keys.length - 1]) + 1;
        if(isNaN(newRound_value)) newRound_value = 0;
        userRoundsTimes_copy[newRound_value.toString()] = [];
        setUserRoundsTimes(userRoundsTimes_copy);
    };

    const handleRoundsButtonStatus = (status)=>{
        const roundsButton = document.getElementById('round-btn');
        roundsButton.className = status;
    };

    const handleTimer = ()=>{

        const startSession = ()=>{
            let timer, currentTime;
            let amrap_count, rest_count;
            let pausedDataLocal;
            if(pauseData) pausedDataLocal = pauseData;

            if(pausedDataLocal) {
                amrap_count = pausedDataLocal.amrapCount;
                rest_count = pausedDataLocal.restCount;
            } else {
                amrap_count = count.amrap;
                rest_count = count.rest;
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
                        startAmrap();
                    }
                }, 1000);
                countDownIntervalID = countDownInterval;
                saveIntervalID(countDownIntervalID);
            };
    
            const startAmrap = ()=>{
                //console.log('startAmrap')
                handleIsOnRest(false);
                handleRoundsButtonStatus('active');
                
                if(!isSessionPaused) {
                    handleUserAmrapTimes();
                } else {
                    handleIsSessionPaused(false)
                }
                
                if(pausedDataLocal) {
                    timer = pausedDataLocal.timer
                    currentTime = pausedDataLocal.currentTime
                    pausedDataLocal = null;
                } else {
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
                    currentTime = session_rests[rest_count] + 1; 
                }

                let restIntervalID;
  
                const restInterval = setInterval(()=>{
                    timer ++
                    currentTime--;
                    setTimersRef({
                        currentTime_ref: currentTime,
                        timer_ref: timer
                    });
                    
                    if(currentTime === 0) {
                        clearInterval(restIntervalID);
                        rest_count++;
                        
                        if(!session_rests[rest_count]) {
                            console.log('final round!')
                        } else {
                            console.log('one more set!')
                        };
    
                        setCount({ amrap: amrap_count, rest: rest_count });
                        setAmrapState({ ...amrapState, userRounds: 0 });
                        startAmrap();
                    }
                }, 1000);
                restIntervalID = restInterval;
                saveIntervalID(restIntervalID);
            };
    
            const endSession = ()=>{
                handleIsSessionEnd(true);
            };
    
            if(!isCountDownDone) startCountDown();
            if(isCountDownDone && !isOnRest) startAmrap();
            if(isCountDownDone && isOnRest) startRest();
        };

        const pauseSession = ()=>{
            //console.log('pauseSession()')
            clearInterval(intervalID);
            handleIsSessionPaused(true);
            handleRoundsButtonStatus('inactive');
            setPauseData({
                currentTime: currentTime_ref,
                timer: timer_ref,
                amrapCount: count.amrap,
                restCount: count.rest
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

    const renderSessionResume = ()=>{
        let counter = 0;

        return all_session_amraps.map(amrap => {
            counter++;
            return (
                <li>
                    <span>AMRAP {counter}</span>
                    <br/>
                    <span>{splitTimeToSecs(amrap)}</span>
                </li>
            )
        });
    };

    const editAmrapSet = (amrap_set)=>{
        const { position } = amrap_set;
        const amrap_sets_Copy = [...amrap_sets];
        amrap_sets_Copy.splice(position, 1, amrap_set)

        setAmrap_sets(amrap_sets_Copy);
    };

    const addAmrap = ()=>{
        let newAmrap;
        if(amrap_sets.length === 0) {
            newAmrap = {
                rest: 30,
                work: 30,
                position: amrap_sets.length
            }
        } else if(amrap_sets.length > 0) {
            const previousAmrap = amrap_sets[amrap_sets.length - 1]
            newAmrap = {
                ...previousAmrap,
                position: amrap_sets.length
            };
        };
        
        setAmrap_sets([ ...amrap_sets, newAmrap ])
    };

    const removeAmrap = (position)=>{
        const amrap_sets_Copy = [...amrap_sets];
        amrap_sets_Copy.splice(position, 1);
        for(let i = 0; i < amrap_sets_Copy.length; i++) {
            amrap_sets_Copy[i].position = i;
        }
        
        setAmrap_sets(amrap_sets_Copy);
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
                    <footer> Show amrap times</footer>
                    <AmrapTimes
                        userRoundsTimes={userRoundsTimes}
                        splitTimeToSecs={splitTimeToSecs}
                        all_session_amraps={all_session_amraps}
                        renderSessionResume={renderSessionResume}
                    />
                </div>
            </div>
        )
    } else if(isTimerReady) {
        return (
            <div>
                { renderAmrapCount() }
                { userLastTime === 0 || userLastTime === null ? (
                    <p>Last round: -:- </p> 
                    ) : <p>Last round: {splitTimeToSecs(userLastTime)}</p> 
                }
                <div>
                    <main id='timer' className="inactive" onClick={()=>handleTimer()}>
                        {/* <img/> */}
                        <h1>{splitTimeToSecs(currentTime_ref)}</h1>
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
                <h3>AMRAP</h3>
                
                <p>As many rounds as posible in:</p>
                
                <select 
                    name='time'
                    value={session_amrap}
                    onChange={ e => setAmrap_time(Number(e.target.value)) }
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