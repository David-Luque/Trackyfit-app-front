import React, { useState, useEffect, useRef } from 'react';

const AmrapSet = ({ amrap, removeAmrap, editAmrapSet, timeOptions }) => {

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
        //TODO: test update of every select values after delete any set

        // update total time of the complete AMRAP


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
            <h4>{amrap.num}. AMRAP (total_time)</h4>
            <label>Rest</label>
            <select name="rest" onChange={(e) => handleChange(e)}>
                {renderSetOptions()}
            </select>
            <label>Work</label>
            <select name="work" onChange={(e) => handleChange(e)}>
                {renderSetOptions()}
            </select>
            <button onClick={()=>removeAmrap(position)}> x </button>
        </div>
    );
}
 
export default AmrapSet;