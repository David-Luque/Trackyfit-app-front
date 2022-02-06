import React from 'react';

const AmrapTimes = ({ userRoundsTimes })=>{

    const renderAmrapTimes = ()=>{
        const timesRounds = Object.keys(userRoundsTimes);

        // timesRounds.map(round => {
        //     const times = userRoundsTimes[round];

        // });
    };

    return (
        <div>
            <h6>Round </h6>
            <ul>
                {renderAmrapTimes()}
            </ul>
        </div>
    );
};

export default AmrapTimes;