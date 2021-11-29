import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MetricService from '../../services/MetricsService';

const CreateMetric = ({ getAllMetrics, handleCreateForm }) => {

    const [ state, setState ] = useState({
        name: "",
        unit: ""
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
        metricService.createMetric(name, unit)
        .then(response => {
            getAllMetrics();
            handleCreateForm();
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Metric name</label>
                <br/>
                <input type="text" name="name" value={state.name} onChange={(e)=>{handleChange(e)}} />
                <br /><br />
                <label>Units</label>
                <br />
                <input type="text" name="unit" value={state.unit} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <Button type="submit">Create</Button>
            </form>
            
        </div>
    );
};

export default CreateMetric;