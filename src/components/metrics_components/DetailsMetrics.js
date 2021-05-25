import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MetricsService from '../../services/MetricsService';
import UserService from '../../services/UserService'
import Chart from 'chart.js';
// import '../styles/DetailsChart.css'


class DetailsMetrics extends React.Component{

  state = {
    loggedInUser: null,
    metricsInfo: [],
    dataBaseChecked: false
  }

  metricService = new MetricsService()
  userService = new UserService()

  
  componentDidMount(){
    this.userService.loggedIn()
    .then((response)=>{
      this.setState({loggedInUser: response})
    })
    .catch(err=>console.log(err))
    .then(()=>{
      this.metricService.getAllMetrics(this.state.loggedInUser._id) 
      .then((result)=>{
        this.setState({
          metricsInfo: result, 
          dataBaseChecked: true
        })
        this.renderChart();
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }


  renderChart(){
      const weightData = this.state.metricsInfo.map((element)=>{
        return element.weight
      })
      const shouldersData = this.state.metricsInfo.map((element)=>{
        return element.shoulders
      })
      const absData = this.state.metricsInfo.map((element)=>{
        return element.abs
      })
      const cuadricepsData = this.state.metricsInfo.map((element)=>{
        return element.cuadriceps
      })
      const dateData = this.state.metricsInfo.map((element)=>{
        return element.date
      })

      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dateData,
              datasets: [
                {
                  label: 'weight',
                  backgroundColor: 'rgba(87, 87, 205, 0.2)',
                  borderColor: 'rgb(87, 87, 205)',
                  data: weightData
                },{
                  label: 'shoulders',
                  backgroundColor: 'rgba(205, 87, 87, 0.2)',
                  borderColor: 'rgb(205, 87, 87)',
                  data: shouldersData
                },{
                  label: 'abs',
                  backgroundColor: 'rgba(87, 205, 139, 0.2)',
                  borderColor: 'rgb(87, 205, 139)',
                  data: absData
                },{
                  label: 'cuadriceps',
                  backgroundColor: 'rgba(205, 196, 87, 0.2)',
                  borderColor: 'rgb(205, 196, 87)',
                  data: cuadricepsData
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

  renderLoadInfo = ()=>{ 
    if (!this.state.dataBaseChecked) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  }

  displayChart = ()=>{
    return(
      <canvas className="metrics-chart" id="myChart"></canvas>
    );
  };


  render(){
    return(
      <div className="DetailsMetrics">      
        <Link to="/add-new-metrics">
          <Button variant="info">New metrics</Button>
        </Link>
        <div className="all-exercises-container">
          {this.state.metricsInfo.length === 0 
            ? this.renderLoadInfo() 
            : this.displayChart() }
        </div>
      </div>
    )    
  }
}

export default DetailsMetrics