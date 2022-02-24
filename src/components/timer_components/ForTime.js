import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { splitTimeToSecs } from '../../config/TimerHelper';
import TimerContext from '../../context/timers/timerContext';
import ForTimeResults from './minor_timer_comp/ForTimeResults';
import ForTimeSets from './minor_timer_comp/ForTimeSets';


const ForTime = ()=>{

    const timerContext = useContext(TimerContext);
    const {
        getTimeOptions,
        isSessionEnd,
        isTimerReady,
        resetState,
        isOnRest,
        timersRef
    } = timerContext;

    const { currentTime_ref, timer_ref } = timersRef;

    const [ forTimeCap, setForTimeCap ] = useState('0');
    const [ isForTimeSets, setIsForTimeSets ] = useState(false);
    const [ count, setCount ] = useState({ forTime: 0, rest: 0 });
    const [ allForTimeSets, setAllForTimeSets ] = useState([]);
    const [ userLastTime, setUserLastTime ] = useState(null);
    const [ userRounds, setUserRounds ] = useState(0);


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
        console.log('prepareForTime()')
    };

    const renderForTimeCount = ()=>{
        if(isForTimeSets) {
            return (
                <>
                    <h3>FOR TIME {count.forTime + 1} of {allForTimeSets.length}</h3>
                    { isOnRest ? (
                        <p>REST</p>
                    ) : (
                        <p>{splitTimeToSecs(allForTimeSets[count.forTime])} minutes</p>
                    )}
                </>
            )
        } else {
            return (
                <>
                    <h3>AMRAP</h3>
                    <p>{splitTimeToSecs(allForTimeSets[count.forTime])} minutes</p>
                </>
            )
        }
    };
    
    const handleTimer = ()=>{
        console.log('handleTimer()')
    };

    const addUserRound = ()=>{
        console.log('addUserRound()')
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
                <h3>FOR TIME</h3>
                
                <p>As fast as posible for time:</p>
                
                <p>Time cap:</p>
                <select 
                    name='time'
                    value={forTimeCap}
                    onChange={ e => setForTimeCap(Number(e.target.value)) }
                > {renderTimeOptions(50)} </select>
                
                { isForTimeSets && <ForTimeSets /> }
                
                <button
                    onClick={() => setIsForTimeSets()}
                > Add sets (optional) </button>
                
                <button onClick={()=>prepareForTime()}>
                    START TIME
                </button>
            </div>
        )
    }
};

export default ForTime;