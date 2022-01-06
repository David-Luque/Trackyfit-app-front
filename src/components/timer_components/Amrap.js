import * as React from 'react';
import { getMinutes } from '../../config/TimerHelper';

const Amrap = ()=>{
    
    const getTimeOptions = ()=>{
        const timeOptionsMin = []; //in minutes
        let i = 0;
        
        do {
            i += .5;
            timeOptionsMin.push(i);
        } while (timeOptionsMin[timeOptionsMin.length - 1] < 30);
        
        //convert to seconds
        const timeOptionsSec = timeOptionsMin.map(op => op * 60);
        return timeOptionsSec;
    };

    // const renderTimeOptions = ()=>{
    //     const options = getTimeOptions();
    //     return options.map((num, index) => {
    //         <option value={} key={index}>
    //             {}
    //         </option>
    //     });
    // };
    
    console.log(getMinutes(120))

    return (
        <div>
            <h3>AMRAP</h3>
            <p>As many rounds as posible in:</p>
            <select name='time'>
                <option value='60'>1:00</option>
                <option>1:30</option>
                <option>2:00</option>
            </select>
            <p>minutes</p>
            <button>Adds multiple AMRAPs</button>
            <button>START</button>
        </div>
    )
};

export default Amrap;