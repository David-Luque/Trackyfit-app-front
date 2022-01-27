import React, { useContext, useState, useEffect } from 'react';
import TimerContext from '../../context/timers/timerContext';
import AmrapSet from './minor_timer_comp/AmrapSet';

const Amrap = ()=>{
    //TODO: include an "useEffect" on every timer_component where execute a fuction to reset "initialState" of TimerContext

    const timerContext = useContext(TimerContext);
    const {
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

    const [ currentGTime, setCurrentGTime ] = useState(null);
    const [ count, setCount ] = useState({ amrap: 0, rest: 0 });

    const [ amrapState, setAmrapState] = useState({
        session_amrap: 0,
        session_sets: [],
        all_session_amraps: [],
        session_rests: [],
        countDownTime: 4,
        isOnRest: false,
        isSessionEnd: false
    });
    const { 
        session_sets, 
        session_amrap,
        all_session_amraps,
        countDownTime,
        session_rests,
        isOnRest,
        isSessionEnd
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
            current_amrap_count: 0,
            current_rest_count: 0,
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

    const startSession = ()=>{
        let timer, currentTime;
        let amrap_count = 0;
        let rest_count = 0;
        
        const countDown = ()=>{
            timer = 0;
            currentTime = countDownTime;

            const countDownInterval = setInterval(()=>{
                timer++;
                currentTime--;
                setCurrentGTime(currentTime);
                
                if(currentTime === 0) {
                    clearInterval(countDownInterval);
                    startAmrap();
                }
            }, 1000);
        };

        const startAmrap = ()=>{
            setAmrapState({ ...amrapState, isOnRest: false });
            
            timer = 0;
            currentTime = all_session_amraps[amrap_count] + 1;
            
            const amrapInterval = setInterval(()=>{
                timer++;
                currentTime--;
                setCurrentGTime(currentTime);
                
                if(currentTime === 0) {
                    clearInterval(amrapInterval);
                    amrap_count++;
                    if(!all_session_amraps[amrap_count]) {
                        return endSession();
                    };
                    startRest();
                }
            }, 1000);
        };

        const startRest = ()=>{
            setAmrapState({ ...amrapState, isOnRest: true });
            
            timer = 0;
            currentTime = session_rests[rest_count] + 1;
            
            const restInterval = setInterval(()=>{
                timer ++
                currentTime--;
                setCurrentGTime(currentTime);
                
                if(currentTime === 0) {
                    clearInterval(restInterval);
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
        };

        const endSession = ()=>{
            setAmrapState({ ...amrapState, isSessionEnd: true });
        };


        countDown();
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
                <div>
                    <main className="inactive" onClick={()=>startSession()}>
                        {/* <img/> */}
                        <h1>{splitTimeToSecs(currentGTime)}</h1>
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