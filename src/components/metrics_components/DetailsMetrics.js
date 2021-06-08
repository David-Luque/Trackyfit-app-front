import React from 'react'
import { Button } from 'react-bootstrap';
import EditMetric from './EditMetric';
import FormMetricMeasure from './FormMetricMeasure';
import MetricsService from '../../services/MetricsService';
import UserService from '../../services/UserService'
import Chart from 'chart.js';
import '../../styles/DetailsChart.css'


class DetailsMetrics extends React.Component{

  state = {
    loggedInUser: null,
    metricsData: "",
    dataBaseChecked: false,
    isMeasureFormDisplayed: false,
    isEditFormDisplayed: false
  }

  metricService = new MetricsService()
  userService = new UserService()

  
  componentDidMount(){
    this.fetchUser();
    this.getMetricData();
  };

  fetchUser = ()=>{
    this.userService.loggedIn()
    .then((response)=>{
      this.setState({loggedInUser: response})
    })
    .catch(err=>console.log(err))
  };

  getMetricData = ()=>{
    this.metricService.getMetricInfo(this.props.match.params.id)
      .then(result => {
        this.setState({
          metricsData: result, 
          dataBaseChecked: true
        })
        this.renderChart();
      })
      .catch(err=>console.log(err))
  };

  renderInfo = ()=>{
    if(this.state.metricsData === ""){
      //console.log("emty string")
      return this.displayLoad();
    }

    if(this.state.metricsData.measures.length === 0){
      //console.log("empty array")
      return this.displayLoad();
    }

    // console.log("displayChart")
    // console.log(this.state.metricsData.measures)
    return this.displayChart();
  };

  renderChart(){
      const quantityData = this.state.metricsData.measures.map((element)=>{
        return element.quantity
      })
      const dateData = this.state.metricsData.measures.map((element)=>{
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

  displayLoad = ()=>{ 
    if (!this.state.dataBaseChecked) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  };
  
  displayChart = ()=>{
    return(
      <canvas className="metrics-chart" id="myChart"></canvas>
    );
  };

  handleMeasureForm = ()=>{
    this.setState({ isMeasureFormDisplayed: !this.state.isMeasureFormDisplayed })
  };

  handleEditForm = ()=>{
    this.setState({
      isEditFormDisplayed: !this.state.isEditFormDisplayed
    });
  };

  renderEditForm = ()=>{
    return (
      <EditMetric 
        metricId={this.state.metricsData._id}
        getMetricData={this.getMetricData}
        handleEditForm={this.handleEditForm}
        metricInfo={{ name: this.state.metricsData.name, unit: this.state.metricsData.unit }}
      />
    )
  };

  renderMeasureForm = ()=>{
    return(
      <FormMetricMeasure 
        getMetricData={this.getMetricData}
        handleMeasureForm={this.handleMeasureForm}
        metricId={this.state.metricsData._id}
        metricUnit={this.state.metricsData.unit}
      />
    )
  };

  deleteMetric = ()=>{
    this.metricService.deleteMetric(this.state.metricsData._id)
    .then(response => {
      console.log(response)
      this.props.history.push('/all-metrics')
    })
    .catch(err => console.log(err))
  };

  ownerCheck = ()=>{
    if(this.props.loggedInUser && this.props.loggedInUser._id === this.state.metricsData.owner) {
      return (
        <div>
          <Button onClick={this.handleEditForm}>
          {this.state.isEditFormDisplayed ? "Cancel" : "Edit metric"}
          </Button>
          {this.state.isEditFormDisplayed && this.renderEditForm()}

          <hr/>
          <Button onClick={this.deleteMetric}>Delete Metric</Button>
        </div>
      )
    }
  }
  

  render(){
    return(
      <div className="DetailsMetrics">
        <h2>{this.state.metricsData.name}</h2>   
        <Button variant="info" onClick={this.handleMeasureForm}>
          {this.state.isMeasureFormDisplayed ? "Cancel" : "Add measure"}
        </Button>

        {this.state.isMeasureFormDisplayed && this.renderMeasureForm()}

        <div className="all-exercises-container">
          {this.renderInfo()}
        </div>

        {this.ownerCheck()}

      </div>
    )    
  }
}

export default DetailsMetrics