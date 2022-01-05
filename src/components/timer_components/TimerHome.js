import * as React from 'react';
import { Link } from 'react-router-dom';

const ChronoHome = ()=>{

    return (
        <div>
            <h2>TRACKIFIT <span>Timer</span></h2>
            <div>
                <ul>
                    <Link to={'/timer/amrap'}><li>AMRAP</li></Link>
                    <Link to={'/timer/fortime'}><li>FOR TIME</li></Link>
                    <Link to={'/timer/emom'}><li>EMOM</li></Link>
                    <Link to={'/timer/tabata'}><li>TABATA</li></Link>
                    <Link to={'/timer/chrono'}><li>CHRONO</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default ChronoHome;