import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MeasureService from '../../services/MeasureService';


const FormMetricMeasure = ({ metricId, getMetricData, handleMeasureForm, metricUnit }) => {

    const [ state, setState ] = useState({
        quantity: "",
        date: ""
    });
    

    const measureService = new MeasureService();

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const { quantity, date } = state;
        const metric = metricId;
        const theMeasure = { quantity, date, metric };
        measureService.addMeasure(theMeasure)
        .then(response => {
            setState({
                quantity: "",
                date: ""
            })
            getMetricData();
            handleMeasureForm();
        })
        .catch(err => console.log(err)) 
    };


    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>{`Quantity (in ${metricUnit})`}</label>
                <br />
                <input type="Number" name="quantity" value={state.quantity} required onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Date</label>
                <br />
                <input type="Date" name="date" value={state.date} required onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <Button type="submit">Confirm</Button>
            </form>
        </div>
    );
};

export default FormMetricMeasure;