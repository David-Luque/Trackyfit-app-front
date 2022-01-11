import React, { useContext } from 'react';
import TimerContext from '../../context/timers/timerContext';

const Amrap = ()=>{

    const timerContext = useContext(TimerContext);
    const {
        isTimerReady,
        getTimeOptions
    } = timerContext

    const renderTimeOptions = ()=>{
        const options = getTimeOptions(10);
        return options.map((op, index) => {
            return (
                <option value={op.value} key={index}>
                    {op.formatValue}
                </option>
            )
        });
    };

    const addAmrap = ()=>{};

    const removeAmrap = ()=>{};
    

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
                <select name='time'>
                    {renderTimeOptions()}
                </select>
                <p>minutes</p>
                {/* <div>{amraps}</div> */}
                <button
                    onClick={() => addAmrap()}
                > Adds multiple AMRAPs </button>
                <button>START</button>
                {/* <p>Total time: {}</p> */}
            </div>
        )
    }
    
};

export default Amrap;