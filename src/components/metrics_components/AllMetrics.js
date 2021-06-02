import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MetricsService from '../../services/MetricsService';
import CreateMetric from './CreateMetric';

class AllMetrics extends Component {

    state = {
        metricsInfo: [],
        isCreateFormDisplayed: false
    };

    service = new MetricsService();

    componentDidMount = ()=>{
        this.getAllMetrics();
    };

    getAllMetrics = ()=>{
        this.service.getAllMetrics()
        .then(response => {
            //console.log(response)
            this.setState({ metricsInfo: response });
        })
        .catch(err => console.log(err))
    };

    renderMetrics = ()=>{
        return this.state.metricsInfo.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-metric/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };

    handleCreateForm = ()=>{
        this.setState({ isCreateFormDisplayed: !this.state.isCreateFormDisplayed });
    };


    render(){
        return(
            <div className="allMetrics">
                <h2>My metrics</h2>
                <Button variant="info" onClick={()=>{this.handleCreateForm()}}>
                    {this.state.isCreateFormDisplayed ? "Cancel" : "Create metric"}
                </Button>
                
                {this.state.isCreateFormDisplayed && <CreateMetric getAllMetrics={this.getAllMetrics} handleCreateForm={this.handleCreateForm} />}
                
                <div>
                    {this.state.metricsInfo.length > 0 && this.renderMetrics()}
                </div>
            </div>
        );
    };
}

export default AllMetrics;