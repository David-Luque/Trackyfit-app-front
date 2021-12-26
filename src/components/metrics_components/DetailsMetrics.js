import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import MetricContext from '../../context/metrics/metricsContext';
import MeasureContext from '../../context/measures/measureContext';
import { Button } from 'react-bootstrap';
import EditMetric from './EditMetric';
import FormMetricMeasure from './FormMetricMeasure';
import Chart from 'chart.js';
//import '../../styles/DetailsChart.css'


const DetailsMetrics = (props) => {

  const authContext = useContext(AuthContext);
  const  { user, authenticated } = authContext;

  const metricContext = useContext(MetricContext);
  const  { metricInfo, isDBrequestDone, isEditMetricFormDisplayed, getMetricInfo, handleEditMetricForm, deleteMetric } = metricContext;

  const measureContext = useContext(MeasureContext);
  const { isMeasureFormDisplayed, handleMeasureForm } = measureContext;


  useEffect(()=>{
    getMetricInfo(props.match.params.id);
    renderChart()
  }, []);
  

  const renderInfo = ()=>{
    if(metricInfo === null || metricInfo.measures.length === 0){
      return displayLoad();
    }
    return displayChart();
  };

  function renderChart(){
      const quantityData = metricInfo.measures.map((element)=>{
        return element.quantity
      })
      const dateData = metricInfo.measures.map((element)=>{
        const stringDate = element.date.toString();
        const day = stringDate.substr(8, 2);
        const month = stringDate.substr(5, 2);
        const year = stringDate.substr(2, 2);
        const shortDate = `${month}/${day}/${year}`
        
        return shortDate;
      })

      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dateData,
              datasets: [
                {
                  label: 'quantity',
                  backgroundColor: 'rgba(87, 87, 205, 0.2)',
                  borderColor: 'rgb(87, 87, 205)',
                  data: quantityData
                }
              ]
          },
          options: {
            aspectRatio: 1,
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
              }
            },
            legend: {
              labels: {
                fontSize: 17,
                boxWidth: 25,
                padding: 20,
                fontColor: "#D6D6D6"
              }
            }
          }
      });
      return chart
  }

  const displayLoad = ()=>{ 
    if (!isDBrequestDone) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  };
  
  const displayChart = ()=>{
    return(
      <canvas className="metrics-chart" id="myChart"></canvas>
    );
  };

  const renderEditForm = ()=>{
    return (
      <EditMetric 
        metricInfo={metricInfo}
      />
    )
  };

  const renderMeasureForm = ()=>{
    return(
      <FormMetricMeasure 
        metricInfo={metricInfo}
        //getMetricInfo={getMetricInfo}
      />
    )
  };

  const deleteTheMetric = ()=>{
    deleteMetric(metricInfo._id)
    props.history.replace('/profile')
    props.history.push('/all-metrics');
  };

  const ownerCheck = ()=>{
    if(authenticated && user._id === metricInfo.owner) {
      return (
        <div>
          <Button className="button-secondary" onClick={handleEditMetricForm}>
          {isEditMetricFormDisplayed ? "Cancel" : "Edit metric"}
          </Button>
          {isEditMetricFormDisplayed && renderEditForm()}

          <hr/>
          <Button className="button-tertiary" onClick={deleteTheMetric}>Delete Metric</Button>
        </div>
      )
    }
  }
  

  return(
    <div className="metrics__details">
      <h2 className="metrics__details-title">{metricInfo.name}</h2>   
      <Button variant="info" onClick={handleMeasureForm}>
        {isMeasureFormDisplayed ? "Cancel" : "Add measure"}
      </Button>

      {isMeasureFormDisplayed && renderMeasureForm()}

      <div className="metrics__chart-container">
        {renderInfo()}
      </div>

      {ownerCheck()}

    </div>
  )    
}

export default DetailsMetrics;