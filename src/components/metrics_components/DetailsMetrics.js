import React, { useContext, useEffect } from 'react'
import MetricContext from '../../context/metrics/metricsContext';
import AuthContext from '../../context/auth/authContext';
import { Button } from 'react-bootstrap';
import EditMetric from './EditMetric';
import FormMetricMeasure from './FormMetricMeasure';
import Chart from 'chart.js';
//import '../../styles/DetailsChart.css'


const DetailsMetrics = ({ match, history, loggedInUser }) => {

  const authContext = useContext(AuthContext);
  const  { user, authenticateUser } = authContext;

  const metricContext = useContext(MetricContext);
  const  { metricInfo, isDBrequestDone, getMetricInfo } = metricContext;


  useEffect(()=>{
    authenticateUser();
    getMetricInfo();
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

  const handleMeasureForm = ()=>{
    setState({
      ...state,
      isMeasureFormDisplayed: !isMeasureFormDisplayed
    })
  };

  const handleEditForm = ()=>{
    setState({
      ...state,
      isEditFormDisplayed: !isEditFormDisplayed
    });
  };

  const renderEditForm = ()=>{
    return (
      <EditMetric 
        metricId={metricsData._id}
        getMetricData={getMetricData}
        handleEditForm={handleEditForm}
        metricInfo={{ name: metricsData.name, unit: metricsData.unit }}
      />
    )
  };

  const renderMeasureForm = ()=>{
    return(
      <FormMetricMeasure 
        getMetricData={getMetricData}
        handleMeasureForm={handleMeasureForm}
        metricId={metricsData._id}
        metricUnit={metricsData.unit}
      />
    )
  };

  const deleteMetric = ()=>{
    metricService.deleteMetric(metricsData._id)
    .then(response => {
      console.log(response);
      history.replace('/profile')
      history.push('/all-metrics');
    })
    .catch(err => console.log(err))
  };

  const ownerCheck = ()=>{
    if(loggedInUser && loggedInUser._id === metricsData.owner) {
      return (
        <div>
          <Button onClick={handleEditForm}>
          {isEditFormDisplayed ? "Cancel" : "Edit metric"}
          </Button>
          {isEditFormDisplayed && renderEditForm()}

          <hr/>
          <Button onClick={deleteMetric}>Delete Metric</Button>
        </div>
      )
    }
  }
  

  return(
    <div className="DetailsMetrics">
      <h2>{metricsData.name}</h2>   
      <Button variant="info" onClick={handleMeasureForm}>
        {isMeasureFormDisplayed ? "Cancel" : "Add measure"}
      </Button>

      {isMeasureFormDisplayed && renderMeasureForm()}

      <div className="all-exercises-container">
        {renderInfo()}
      </div>

      {ownerCheck()}

    </div>
  )    
}

export default DetailsMetrics