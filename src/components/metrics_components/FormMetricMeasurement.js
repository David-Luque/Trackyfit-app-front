import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MetricsService from '../../services/MetricsService';


class FormMetricMeasurement extends Component {

    state = {
        quantity: "",
        unit: "",
        date: ""
    };

    service = new MetricsService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e)=>{
        e.preventDefault();

        const { quantity, unit, date } = this.state;
        const metric = this.props.metricId;

        const results = { quantity, unit, date, metric };
        //console.log(results)
        this.service.addMeasure(results)
        .then(response => {
            this.setState({
                reps: "",
                time: "",
                weight: "",
                date: ""
            })
            this.props.getExerciseInfo();
            this.props.handleResultsForm();
        })
        .catch()
    };


    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Quantity</label>
                    <br />
                    <input type="Number" name="quantity" value={this.state.quantity} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Unit</label>
                    <br />
                    <input type="text" name="unit" value={this.state.unit} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Date</label>
                    <br />
                    <input type="Date" name="date" value={this.state.date} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <Button type="submit">Confirm</Button>
                </form>
            </div>
        );
    };
};

export default FormMetricMeasurement;