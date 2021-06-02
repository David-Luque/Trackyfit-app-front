import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MetricService from '../../services/MetricsService';

class CreateMetric extends Component {

    state = {
        name: "",
    };

    service = new MetricService();

    handleChange = (event)=>{
        this.setState({ name: event.target.value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        this.service.createMetric(this.state.name)
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
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <Button type="submit">Create</Button>
                </form>
                
            </div>
        );
    };
};

export default CreateMetric;