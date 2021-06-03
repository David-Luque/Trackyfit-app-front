import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MetricService from '../../services/MetricsService';

class CreateMetric extends Component {

    state = {
        name: "",
        unit: ""
    };

    service = new MetricService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const { name, unit } = this.state;
        this.service.createMetric(name, unit)
        .then(response => {
            //console.log(response)
            this.props.getAllMetrics();
            this.props.handleCreateForm();
        })
        .catch(err => console.log(err))
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit} >
                    <label>Metric name</label>
                    <br/>
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <label>Units</label>
                    <br />
                    <input type="text" name="unit" value={this.state.unit} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <Button type="submit">Create</Button>
                </form>
                
            </div>
        );
    };
};

export default CreateMetric;