import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import EditMetric from './EditMetric';
import FormMetricMeasure from './FormMetricMeasure';
import MetricsService from '../../services/MetricsService';
import UserService from '../../services/UserService'
import Chart from 'chart.js';
import '../../styles/DetailsChart.css'


const DetailsMetrics = ({ match, history, loggedInUser }) => {

  const [ state, setState ] = useState({
    loggedInUser: null,
    metricsData: "",
    dataBaseChecked: false,
    isMeasureFormDisplayed: false,
    isEditFormDisplayed: false
  });

  const metricService = new MetricsService()
  const userService = new UserService()

  useEffect(()=>{
    fetchUser();
    getMetricData();
  }, []);
  

  const fetchUser = ()=>{
    userService.loggedIn()
    .then((response)=>{
      setState({
        ...state,
        loggedInUser: response
      })
    })
    .catch(err=>console.log(err))
  };

  const getMetricData = ()=>{
    metricService.getMetricInfo(match.params.id)
      .then(result => {
        setState({
          ...state,
          metricsData: result, 
          dataBaseChecked: true
        })
        renderChart();
      })
      .catch(err=>console.log(err))
  };

  const renderInfo = ()=>{
    if(state.metricsData === "" || state.metricsData.measures.length === 0){
      return displayLoad();
    }
    
    return displayChart();
  };

  function renderChart(){
      const quantityData = state.metricsData.measures.map((element)=>{
        return element.quantity
      })
      const dateData = state.metricsData.measures.map((element)=>{
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
    if (!state.dataBaseChecked) 
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
      isMeasureFormDisplayed: !state.isMeasureFormDisplayed
    })
  };

  const handleEditForm = ()=>{
    setState({
      ...state,
      isEditFormDisplayed: !state.isEditFormDisplayed
    });
  };

  const renderEditForm = ()=>{
    return (
      <EditMetric 
        metricId={state.metricsData._id}
        getMetricData={getMetricData}
        handleEditForm={handleEditForm}
        metricInfo={{ name: state.metricsData.name, unit: state.metricsData.unit }}
      />
    )
  };

  const renderMeasureForm = ()=>{
    return(
      <FormMetricMeasure 
        getMetricData={getMetricData}
        handleMeasureForm={handleMeasureForm}
        metricId={state.metricsData._id}
        metricUnit={state.metricsData.unit}
      />
    )
  };

  const deleteMetric = ()=>{
    metricService.deleteMetric(state.metricsData._id)
    .then(response => {
      console.log(response);
      history.replace('/profile')
      history.push('/all-metrics');
    })
    .catch(err => console.log(err))
  };

  const ownerCheck = ()=>{
    if(loggedInUser && loggedInUser._id === state.metricsData.owner) {
      return (
        <div>
          <Button onClick={handleEditForm}>
          {state.isEditFormDisplayed ? "Cancel" : "Edit metric"}
          </Button>
          {state.isEditFormDisplayed && renderEditForm()}

          <hr/>
          <Button onClick={deleteMetric}>Delete Metric</Button>
        </div>
      )
    }
  }
  

  return(
    <div className="DetailsMetrics">
      <h2>{state.metricsData.name}</h2>   
      <Button variant="info" onClick={handleMeasureForm}>
        {state.isMeasureFormDisplayed ? "Cancel" : "Add measure"}
      </Button>

      {state.isMeasureFormDisplayed && renderMeasureForm()}

      <div className="all-exercises-container">
        {renderInfo()}
      </div>

      {ownerCheck()}

    </div>
  )    
}

export default DetailsMetrics