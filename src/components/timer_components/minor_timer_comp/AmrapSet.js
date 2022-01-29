import React, { useState, useEffect, useRef } from 'react';

const AmrapSet = ({ amrap, removeAmrap, editAmrapSet, getTimeOptions, splitTimeToSecs }) => {

    const { work, rest, position } = amrap;

    const [ amrap_set, setAmrap_set ] = useState({
        work,
        rest,
        position
    });

    const initialMount = useRef(true);
    useEffect(()=>{
        if(initialMount.current) {
            initialMount.current = false;
        } else {
            editAmrapSet(amrap_set)
        }
    }, [ amrap_set ]);


    const handleChange = (event)=>{
        const { name, value } = event.target;
        setAmrap_set({
            ...amrap_set,
            [name]: Number(value)
        });
    };

    const renderSetOptions = ()=>{
        const timeOptions = getTimeOptions(10);
        
        return timeOptions.map((op, index)=>{
            return (
                <option value={op.value} key={index}>
                    {op.formatValue}
                </option>
            )
        });
    };
    

    return (
        <div>
            <h4>{position+2}. AMRAP ({splitTimeToSecs(work)} min)</h4>
            <label>Rest</label>
            <select name="rest" value={rest} onChange={(e) => handleChange(e)}>
                {renderSetOptions()}
            </select>
            <label>Work</label>
            <select name="work" value={work} onChange={(e) => handleChange(e)}>
                {renderSetOptions()}
            </select>
            <button onClick={()=>removeAmrap(position)}> x </button>
        </div>
    );
}
 
export default AmrapSet;