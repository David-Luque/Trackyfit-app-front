import React from 'react';

const AmrapSet = (amrap, removeAmrap, editAmrapSet, timeOptions) => {
    
    const renderSetOptions = ()=>{
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
            {/* <select>
                {renderSetOptions()}
            </select>
            <label>Minutes</label>
            <select>
                {renderSetOptions()}
            </select> */}
            <span onClick={()=>removeAmrap(amrap.num)}> x </span>
        </div>
    );
}
 
export default AmrapSet;