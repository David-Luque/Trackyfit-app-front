import React, { useContext } from 'react';
import TimerContext from '../../context/timers/timerContext';
import AmrapSet from './minor_timer_comp/AmrapSet';

const Amrap = ()=>{

    const timerContext = useContext(TimerContext);
    const {
        timer,
        setAmrapTime,
        addAmrap,
        removeAmrap,
        amrap_sets,
        editAmrapSet,
        isTimerReady,
        getTimeOptions
    } = timerContext

    const renderTimeOptions = (maxMinutes)=>{
        const max_minutes = maxMinutes;
        const options = getTimeOptions(max_minutes);
        return options.map((op, index) => {
            return (
                <option value={op.value} key={index}>
                    {op.formatValue}
                </option>
            )
        });
    };

    const renderAmraps = ()=>{
        const timeOptions = getTimeOptions(10);
        return amrap_sets.map(amrap => (
            <AmrapSet 
                amrap={amrap}
                removeAmrap={removeAmrap}
                editAmrapSet={editAmrapSet}
                timeOptions={timeOptions}
            />
        ));
    };
    

    if(isTimerReady) { 
        return (
            <div>
                <h3>AMRAP</h3>
                {/* <p>Minutes: {}</p> */}
                <div>
                    <main>
                        <img/>
                        <p>Tap to start</p>
                    </main>
                    <aside>
                        <p>+</p>
                        <p>round counter</p>
                    </aside>
                </div>
            </div>
        )} else {
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
                
                <button>START</button>
                
                {/* <p>Total time: {}</p> */}
            </div>
        )
    }
    
};

export default Amrap;