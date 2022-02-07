import React from 'react';

const AmrapTimes = ({ userRoundsTimes, splitTimeToSecs })=>{

    const renderAmrapTimes = ()=>{
        const amrapRounds = Object.keys(userRoundsTimes);
        //console.log(amrapRounds)

        return amrapRounds.map(round => {
            //console.log(round, userRoundsTimes[round])
            return (
                <div>
                    <h6> Round {round+1}</h6>
                    <ul>
                        {displayRoundTimes(userRoundsTimes[round])}
                    </ul>
                </div>
            )
        });
    };
    
    const displayRoundTimes = (roundTimes)=> {
        //TODO: change to .map
        for(let i = 0; i < roundTimes.length; i++) {
            return (
                <li key={i}>
                    Round {i+1}
                    { splitTimeToSecs(roundTimes[i]) }
                    { getDiffTime(i, roundTimes[i], roundTimes[i-1]) }
                </li>     
            )
        }
    };

    const getDiffTime = (index, currTime, prevTime)=>{
        if(index > 0) {
            const diff = currTime - prevTime;
            return(
                <span className={diff > 0 ? 'positive' : 'negative'}>
                    {diff} sec
                </span>
            )
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