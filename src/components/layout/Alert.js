import React from 'react';

const Alert = ({alert}) => {
    return (
        <div className={`alert ${alert.category}`}>
            {alert.msg}
        </div>
    );
}
 
export default Alert;