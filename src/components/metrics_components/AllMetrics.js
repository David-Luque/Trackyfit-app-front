import React, { useContext, useEffect } from 'react';
import MetricContext from '../../context/metrics/metricsState';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateMetric from './CreateMetric';

const AllMetrics = () => {

    const metricContext = useContext(MetricContext);
    const { metrics, isCreateFormDisplayed, getAllMetrics, handleCreateMetricForm, createMetric } = metricContext;

    useEffect(()=>{
        getAllMetrics();
    }, []);
    

    const renderMetrics = ()=>{
        return metrics.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-metric/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };


    return(
        <div className="allMetrics">
            <h2>My metrics</h2>
            <Button variant="info" onClick={()=>handleCreateMetricForm()}>
                {isCreateFormDisplayed ? "Cancel" : "Create metric"}
            </Button>
            
            {isCreateFormDisplayed && <CreateMetric createMetric={createMetric} />}
            
            <div>
                {metrics.length > 0 && renderMetrics()}
            </div>
        </div>
    );
}

export default AllMetrics;