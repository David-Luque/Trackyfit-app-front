import React, { useContext } from 'react';
import TimerContext from '../../context/timers/timerContext';

const Amrap = ()=>{

    const timerContext = useContext(TimerContext);
    const [
        getTimeOptions
    ] = timerContext

    const renderTimeOptions = ()=>{
        const options = getTimeOptions(30);
        return options.map((op, index) => {
            return (
                <option value={op.value} key={index}>
                    {op.formatValue}
                </option>
            )
        });
    };
    

    return (
        <div>
            <h3>AMRAP</h3>
            <p>As many rounds as posible in:</p>
            <select name='time'>
                {renderTimeOptions()}
            </select>
            <p>minutes</p>
            <button>Adds multiple AMRAPs</button>
            <button>START</button>
        </div>
    )
};

export default Amrap;