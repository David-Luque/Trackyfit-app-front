import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MetricsService from '../../services/MetricsService';
import CreateMetric from './CreateMetric';

const AllMetrics = () => {

    const [ state, setState ] = useState({
        metricsInfo: [],
        isCreateFormDisplayed: false
    });

    const metricService = new MetricsService();

    useEffect(()=>{
        this.getAllMetrics();
    }, []);
    

    const getAllMetrics = ()=>{
        metricService.getAllMetrics()
        .then(response => {
            setState({
                ...state,
                metricsInfo: response
            });
        })
        .catch(err => console.log(err))
    };

    const renderMetrics = ()=>{
        return state.metricsInfo.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-metric/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };

    const handleCreateForm = ()=>{
        setState({
            ...state,
            isCreateFormDisplayed: !this.state.isCreateFormDisplayed
        });
    };


    return(
        <div className="allMetrics">
            <h2>My metrics</h2>
            <Button variant="info" onClick={()=>handleCreateForm()}>
                {state.isCreateFormDisplayed ? "Cancel" : "Create metric"}
            </Button>
            
            {state.isCreateFormDisplayed && <CreateMetric getAllMetrics={getAllMetrics} handleCreateForm={handleCreateForm} />}
            
            <div>
                {state.metricsInfo.length > 0 && renderMetrics()}
            </div>
        </div>
    );
}

export default AllMetrics;