import React, { useState, useContext } from 'react';
import MeasureContext from '../../context/measures/measureContext';
import { Button } from 'react-bootstrap';


const FormMetricMeasure = ({ metricInfo }) => {

    const measureContext= useContext(MeasureContext);
    const { addMeasure } = measureContext;

    const [ measure, setMeasure ] = useState({
        quantity: "",
        date: ""
    });
    const { quantity, date } = measure;

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setMeasure({
            ...measure,
            [name]: value
        });
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        addMeasure(metricInfo._id, measure)
        //getMetricInfo(); this or push directly new measure into local metric state?
        setMeasure({
            quantity: "",
            date: ""
        })
    };


    return(
        <form className="data-form--measures" onSubmit={handleFormSubmit}>
            <label>{`Quantity (in ${metricInfo.metricUnit})`}</label>
            <br />
            <input type="Number" name="quantity" value={quantity} required onChange={(e)=>{handleChange(e)}}/>
            <br /><br />
            <label>Date</label>
            <br />
            <input type="Date" name="date" value={date} required onChange={(e)=>{handleChange(e)}}/>
            <br /><br />
            <Button className="button-secondary" type="submit">Confirm</Button>
        </form>
    );
};

export default FormMetricMeasure;