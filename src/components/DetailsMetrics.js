import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MetricsService from '../services/MetricsService';
import Chart from 'chart.js';
import '../styles/DetailsMetrics.css'


class DetailsMetrics extends React.Component{

  state = {
    metricsInfo: []
  }

  service = new MetricsService()

  
  componentDidMount(){
    
    this.service.
    getAllMetrics(this.props.loggedInUser._id) 
    .then((result)=>{
      this.setState({metricsInfo: result})
      this.renderChart()
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  renderChart(){
    console.log('RENDER CHART metrics')

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

      // const sortedData = this.state.metricsInfo.sort((a, b) => {
      //     a = a.date.split('/').join('');
      //     b = b.date.split('/').join('');
      //     return a > b ? 1 : a < b ? -1 : 0;
        
      // })
      //  console.log(`sorted data: ${dateData}`)

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

          // Configuration options go here
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
                boxWidth: 25,
                padding: 20,
                fontColor: "#D6D6D6"
              }
            }
          }
      });

      return chart
  }

  renderLoadingImage = ()=>{
    // return <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading"/> 
    return <p>Loading...</p>
  }


  render(){
    return(
      <div className="DetailsMetrics">
        <Button variant="info">
          <Link to="/add-new-metrics">new entry</Link>
        </Button>
        <div className="all-exercises-container">
          {this.state.metricsInfo.length === 0 
            ? this.renderLoadingImage() 
            : <canvas className="metrics-chart" id="myChart"></canvas>}          
        </div>
      </div>
    )    
  }
}

export default DetailsMetrics