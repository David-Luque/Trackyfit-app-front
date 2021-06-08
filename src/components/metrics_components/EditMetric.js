import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MetricService from '../../services/MetricsService';

class EditMetric extends Component {

    state = {
        name: this.props.metricInfo.name,
        unit: this.props.metricInfo.unit
    };

    service = new MetricService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const { name, unit } = this.state;
        this.service.editMetric(this.props.metricId, name, unit)
        .then(response => {
            this.props.getMetricData();
            this.props.handleEditForm();
        })
        .catch(err => console.log(err))
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit} >
                    <label>New metric name:</label>
                    <br />
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <br />
                    <label>New metric units:</label>
                    <br />
                    <input type="text" name="unit" value={this.state.unit} onChange={(e)=>{this.handleChange(e)}} />
                    <br />
                    <Button type="submit">Edit</Button>
                </form>
            </div>
        );
    };
};

export default EditMetric;