import * as React from 'react';
import { splitTimeToSecs } from '../../config/TimerHelper';


const Emom = ()=>{

    const getTimeOptions = (maxMinutes)=>{

        const generateOptions = ()=>{
            const timeOptionsMin = []; //in minutes
            let i = 0;
            do {
                i += .5;
                timeOptionsMin.push(i);
            } while (timeOptionsMin[timeOptionsMin.length - 1] <= maxMinutes);
            //convert to seconds
            const timeOptionsSec = timeOptionsMin.map(op => op * 60);
            return timeOptionsSec;
        };
        
        const formatTimeOptions = (options)=>{
            return options.map(opt => splitTimeToSecs(opt));
        }; 

        const compoundTimeOptions = ()=> {
            const options = generateOptions(30);
            const formatOptions = formatTimeOptions(options);
            let timeData = [];
            
            for(let i = 0; i < options.length - 1; i++) {
                timeData.push({
                    value: options[i],
                    formatValue: formatOptions[i]
                });
            }
            return timeData;
        };

        return compoundTimeOptions();
    };


    const renderTimeOptions = ()=>{
        const options = getTimeOptions(150);
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
            <h3>EMOM</h3>
            <p>Every minute on the minute:</p>
            <select name='time'>
                {renderTimeOptions()}
            </select>
            <p>minutes</p>
            <button>Adds sets</button>
            <button>As long as posible</button>
            <button>START</button>
        </div>
    )
};

export default Emom;