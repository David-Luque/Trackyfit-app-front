import React from 'react';

const AmrapTimes = ({ userRoundsTimes, splitTimeToSecs, all_session_amraps })=>{

    const renderAmrapTimes = ()=>{
        const amrapRounds = Object.keys(userRoundsTimes);
        //const session_amraps_copy = [...all_session_amraps];
        let time_left_over;
        let counter = 0;

        return amrapRounds.map(round => {
            console.log(all_session_amraps)
            const currentAmrapTime = all_session_amraps[counter];
            const totalRoundTimes = userRoundsTimes[round].reduce((acc, curr)=> {
                return acc + curr 
            }, 0);
            counter++;
            console.log(currentAmrapTime)
            console.log(totalRoundTimes)
            time_left_over = currentAmrapTime - totalRoundTimes;
            console.log(time_left_over)

            return (
                <div>
                    <h6> AMRAP {Number(round) + 1}</h6>
                    <ul>
                        {displayRoundTimes(userRoundsTimes[round])}
                    </ul>
                    <p>Time left over: { splitTimeToSecs(time_left_over) }</p>
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
            <header>
                <button>share</button>
                <p>Hide round times</p>
            </header>
            <div>
                <span>amraps</span>
                <span>time</span>
            </div>
            <div>
                <h5>Round times:</h5>
                <div>
                    {renderAmrapTimes()}
                </div>
            </div>
        </div>
    );
};

export default AmrapTimes;