import React, { useContext, useState, useEffect } from 'react';
import TimerContext from '../../context/timers/timerContext';
import AmrapSet from './minor_timer_comp/AmrapSet';

const Amrap = ()=>{
    //TODO: include an "useEffect" on every timer_component where execute a fuction to reset "initialState" of TimerContext

    const timerContext = useContext(TimerContext);
    const {
        timer,
        intervalID,
        saveIntervalID,
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

    const [ sessionTimes, setSessionTimes ] = useState({
        session_amrap: null,
        session_sets: null,
        all_session_amraps: null,
        session_rests: null
    });
    const { session_amrap, session_sets, all_session_amraps, session_rests } = sessionTimes

    const [ sessionCounter, setSessionCounter ] = useState({
        currentAmrap: null,
        currentRest: null
    });
    let { currentAmrap, currentRest } = sessionCounter

    const [ countDownTime, setCountDownTime ] = useState(10);
    const [ currentTime, setCurrentTime ] = useState(null);


    useEffect(()=>{
        // setSessionTimes({
        //     ...sessionTimes,
        //     session_amrap: amrap_time
        // });
        
        if(amrap_sets.length > 0) {
            const session_amrap_sets = amrap_sets.map(amrap => amrap.work);
            const session_amrap_rests = amrap_sets.map(amrap => amrap.rest);
            setSessionTimes({
                ...sessionTimes,
                session_sets: session_amrap_sets,
                session_rests: session_amrap_rests
            })
        } else {
            setSessionTimes({
                session_amrap: amrap_time,
                session_sets: null,
                all_session_amraps: null,
                session_rests: null
            });
        }
    }, [amrap_time, amrap_sets]);


    const renderTimeOptions = (maxMinutes)=>{
        const max_minutes = maxMinutes;
        const options = getTimeOptions(max_minutes);
        
        return (
            <>
                <option> - </option>
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
        return amrap_sets.map(amrap => (
            <AmrapSet 
                amrap={amrap}
                removeAmrap={removeAmrap}
                editAmrapSet={editAmrapSet}
                getTimeOptions={getTimeOptions}
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
    
    const prepareAmrap = ()=>{
        setSessionCounter({
            currentAmrap: 1,
            currentRest: 1
        });

        if(session_sets) {
            setSessionTimes({
                ...sessionTimes,
                all_session_amraps: [session_amrap, ...session_sets]
            });
        } else {
            setSessionTimes({
                ...sessionTimes,
                all_session_amraps: [session_amrap]
            });
        }
        
        setTimerReady();
    };

    const renderAmrapCount = ()=>{
        if(session_sets) {
            return (
                <>
                    <h3>AMRAP {currentAmrap} of {all_session_amraps.length}</h3>
                    <p>{splitTimeToSecs(all_session_amraps[currentAmrap-1])} minutes</p>
                </>
            )
        } else {
            return (
                <>
                    <h3>AMRAP</h3>
                    <p>{splitTimeToSecs(all_session_amraps[currentAmrap-1])} minutes</p>
                </>
            )
        }
    };

    const startSession = ()=>{
        console.log('START!!!')
        const countDown = ()=>{
            const countDownInterval = setInterval(()=>{
                startTime();
                setCountDownTime(countDownTime - timer);
                if(countDownTime === 0) {
                    clearInterval(intervalID);
                    resetTimer();
                    startAmrap();
                }
            }, 10);
            
            saveIntervalID(countDownInterval);
        };

        const startAmrap = ()=>{
            setCurrentTime(all_session_amraps[0]);
            
            const amrapInterval = setInterval(()=>{
                startTime();
                setCurrentTime(currentTime - timer)
                
                if(currentTime === 0) {
                    clearInterval(amrapInterval);
                    if(!all_session_amraps[currentAmrap+1]) return endSession();
                    setSessionCounter({
                        ...sessionCounter,
                        currentAmrap: currentAmrap++
                    });
                    resetTimer();
                    startRest();
                }
            }, 10);
        };

        const startRest = ()=>{
            setCurrentTime(session_rests[currentRest]);
            
            const restInterval = setInterval(()=>{
                startTime();
                setCurrentTime(currentTime - timer)
                
                if(currentTime === 0) {
                    clearInterval(restInterval);
                    // if(!session_rests[currentRest+1]) return lastRound alert
                    if(session_rests[currentRest+1]) {
                        setSessionCounter({
                            ...sessionCounter,
                            currentRest: currentRest++
                        });
                    };
                    resetTimer();
                    startAmrap();
                }
            }, 10);
        };

        const endSession = ()=>{
            setEndSession();
        };


        countDown();
    };


    if(isEndSession) { 
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
                <div>
                    <main className="inactive" onClick={()=>startSession()}>
                        {/* <img/> */}
                        <h1>{splitTimeToSecs(countDownTime)}</h1>
                        <p>Tap to start</p>
                    </main>
                    <aside>
                        <p>+</p>
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
                <select onChange={(e)=>setAmrapTime(e.target.value)} name='time'>
                    {renderTimeOptions(10)}
                </select>
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