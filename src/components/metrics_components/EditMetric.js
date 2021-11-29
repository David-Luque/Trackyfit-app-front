import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MetricService from '../../services/MetricsService';

const EditMetric = ({ metricInfo, metricId, getMetricData, handleEditForm }) => {

    const [ state, setState ] = useState({
        name: metricInfo.name,
        unit: metricInfo.unit
    });

    const metricService = new MetricService();

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        const { name, unit } = state;
        metricService.editMetric(metricId, name, unit)
        .then(response => {
            getMetricData();
            handleEditForm();
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>New metric name:</label>
                <br />
                <input type="text" name="name" value={state.name} onChange={(e)=>{handleChange(e)}} />
                <br />
                <label>New metric units:</label>
                <br />
                <input type="text" name="unit" value={state.unit} onChange={(e)=>{handleChange(e)}} />
                <br />
                <Button type="submit">Edit</Button>
            </form>
        </div>
    );
};

export default EditMetric;