import React from 'react';

const AmrapTimes = ({ userRoundsTimes, splitTimeToSecs })=>{

    const renderAmrapTimes = ()=>{
        const amrapRounds = Object.keys(userRoundsTimes);
        return amrapRounds.map(round => {
            return (
                <div>
                    <h6> Amrap {Number(round) + 1}</h6>
                    <ul>
                        {displayRoundTimes(userRoundsTimes[round])}
                    </ul>
                </div>
            )
        });
    };
    
    const displayRoundTimes = (roundTimes)=> {
        let index;
        return roundTimes.map(time => {
            if(index === undefined) { index = 0 } else { index++ }
            return (
                <li key={index}>
                    Round {index+1} <br/>
                    { splitTimeToSecs(time) } <br/>
                    { getDiffTime(index, time, roundTimes[index-1]) }
                </li>     
            )
        })
    };

    const getDiffTime = (index, currTime, prevTime)=>{
        if(index > 0) {
            const diff = currTime - prevTime;
            if (diff < 0) {
                return (
                    <span className='negative'>
                        {diff} sec
                    </span> 
                )
            } else if(diff > 0) {
                return (
                    <span className='positive'>
                        +{diff} sec
                    </span> 
                )
            } else { return <span> = </span> }
        }
    };



    return (
        <div>
            <h5>Round times:</h5>
            <div>
                {renderAmrapTimes()}
            </div>
            <p>Time left over: {'time'}</p>
        </div>
    );
};

export default AmrapTimes;