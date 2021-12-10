import React, { useState, useContext } from 'react';
import MetricsContext from '../../context/metrics/metricsContext';
import { Button } from 'react-bootstrap';

const EditMetric = ({ metricInfo, getMetricInfo, handleEditMetricForm }) => {

    const metricContext = useContext(MetricsContext);
    const { editMetric } = metricContext;
    
    const [ metric, setMetric ] = useState({
        name: metricInfo.name,
        unit: metricInfo.unit
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
        editMetric(metricInfo._id, metric)
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>New metric name:</label>
                <br />
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <br />
                <label>New metric units:</label>
                <br />
                <input type="text" name="unit" value={unit} onChange={(e)=>{handleChange(e)}} />
                <br />
                <Button type="submit">Edit</Button>
            </form>
        </div>
    );
};

export default EditMetric;