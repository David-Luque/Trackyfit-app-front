import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MeasureService from '../../services/MeasureService';


class FormMetricMeasure extends Component {

    state = {
        quantity: "",
        date: ""
    };

    service = new MeasureService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e)=>{
        e.preventDefault();
        const { quantity, date } = this.state;
        const metric = this.props.metricId;
        const theMeasure = { quantity, date, metric };
        //console.log(theMeasure)
        this.service.addMeasure(theMeasure)
        .then(response => {
            this.setState({
                quantity: "",
                date: ""
            })
            this.props.getMetricData();
            this.props.handleMeasureForm();
        })
        .catch()
    };


    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>{`Quantity (in ${this.props.metricUnit})`}</label>
                    <br />
                    <input type="Number" name="quantity" value={this.state.quantity} required onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Date</label>
                    <br />
                    <input type="Date" name="date" value={this.state.date} required onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <Button type="submit">Confirm</Button>
                </form>
            </div>
        );
    };
};

export default FormMetricMeasure;