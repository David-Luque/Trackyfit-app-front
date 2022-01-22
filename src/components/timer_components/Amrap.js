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

    
    const [ amrapState, setAmrapState] = useState({
        session_amrap: null,
        session_sets: null,
        all_session_amraps: null,
        session_rests: null,
        current_amrap_count: null,
        current_rest_count: null,
        currentDownTime: 10,
        currentTime: null
    });
    const { 
        session_sets, 
        session_amrap,
        all_session_amraps,
        current_amrap_count,
        currentDownTime,
        currentTime,
        session_rests,
        current_rest_count
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
        setAmrapState({
            ...amrapState,
            currentAmrap: 1,
            currentRest: 1
        });

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

    const renderAmrapCount = ()=>{
        if(session_sets) {
            return (
                <>
                    <h3>AMRAP {current_amrap_count} of {all_session_amraps.length}</h3>
                    <p>{splitTimeToSecs(all_session_amraps[current_amrap_count - 1])} minutes</p>
                </>
            )
        } else {
            return (
                <>
                    <h3>AMRAP</h3>
                    <p>{splitTimeToSecs(all_session_amraps[current_amrap_count - 1])} minutes</p>
                </>
            )
        }
    };

    const startSession = ()=>{
        //console.log('START!!!')
        //console.log(timer)
        const countDown = ()=>{
            const countDownInterval = setInterval(()=>{
                startTime();
                setAmrapState({
                    ...amrapState,
                    currentDownTime: currentDownTime - 1
                });
                //console.log(currentDownTime)
                
                if(currentDownTime === 0) {
                    //console.log('FINISH!!')
                    clearInterval(intervalID);
                    resetTimer();
                    startAmrap();
                }
            }, 1000);
            
            saveIntervalID(countDownInterval);
        };

        const startAmrap = ()=>{
            //console.log('startAmrap()');
            setAmrapState({
                ...amrapState,
                currentTime: all_session_amraps[0]
            });
            
            const amrapInterval = setInterval(()=>{
                startTime();
                setAmrapState({
                    ...amrapState,
                    currentTime: currentTime - timer
                });
                
                if(currentTime === 0) {
                    clearInterval(amrapInterval);
                    if(!all_session_amraps[current_amrap_count+1]) return endSession();
                    setAmrapState({
                        ...amrapState,
                        current_amrap_count: current_amrap_count + 1
                    });
                    resetTimer();
                    startRest();
                }
            }, 1000);
        };

        const startRest = ()=>{
            setAmrapState({
                ...amrapState,
                currentTime: session_rests[current_rest_count]
            });
            
            const restInterval = setInterval(()=>{
                startTime();
                setAmrapState({
                    ...amrapState,
                    currentTime: currentTime - timer
                });
                
                if(currentTime === 0) {
                    clearInterval(restInterval);
                    // if(!session_rests[current_rest_count+1]) return lastRound alert
                    if(session_rests[current_rest_count+1]) {
                        setAmrapState({
                            ...amrapState,
                            current_rest_count: current_rest_count + 1
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
                        <h1>{splitTimeToSecs(currentDownTime)}</h1>
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