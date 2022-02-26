import React from 'react';

const ForTimeSets = ({ renderTimeOptions, setSessionRest, setSessionSets, sessionRest, sessionSets }) => {
    
    
    const renderSetsOptions = ()=>{
        const indexMinutes = [ ...Array(11).keys() ];
        const countMinutes = indexMinutes.filter(e => e > 0);
        // const minuteOptions = countMinutes.map(e => {
        //     return {
        //         option: e.toString(),
        //         value: e * 60
        //     }
        // });
        
        const formatedOptions = countMinutes.map((option, index) => (
            <option key={index} value={option}>
                {option.toString()}
            </option>
        ));
        return formatedOptions;
    };
    
    
    return (
        <div>
            <div>
                <p>Sets</p>
                <select 
                    name="sets" 
                    value={sessionSets} 
                    onChange={(e) => setSessionSets(Number(e.target.value))}
                >
                    {renderSetsOptions()}    
                </select> 
            </div>
            <div>
                <p>Rest</p>
                <select 
                    name="rest" 
                    value={sessionRest} 
                    onChange={(e)=>setSessionRest(Number(e.target.value))}
                >
                    {renderTimeOptions(10)}
                </select> 
            </div>
        </div>
    );
}
 
export default ForTimeSets;