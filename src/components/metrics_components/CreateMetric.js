import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const CreateMetric = ({ createMetric }) => {

    const [ metric, setMetric ] = useState({
        name: "",
        unit: ""
    });
    const { name, unit } = metric;

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setMetric({
            ...metric,
            [name]: value
        });
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        createMetric(metric)
    };

    return(
        <div className="metrics__create">
            <form className="metrics__create--form" onSubmit={handleFormSubmit} >
                <label>Metric name</label>
                <br/>
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <br /><br />
                <label>Units</label>
                <br />
                <input type="text" name="unit" value={unit} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <Button type="submit">Create</Button>
            </form>
            
        </div>
    );
};

export default CreateMetric;