import React from 'react'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import ExerciseService from '../services/ExerciseService'
import UserService from '../services/UserService'
import Chart from 'chart.js';
import '../styles/DetailsWorkout.css'

class DetailsWorkouts extends React.Component {

  state = {
    loggedInUser: null,
    exercisesData: [],
    dataBaseChecked: false
  }

  exerService = new ExerciseService()
  userService = new UserService()

  componentDidMount(){
    this.userService.loggedin()
    .then((response)=>{
      this.setState({loggedInUser: response})
    })
    .then(()=>{
      this.exerService.getAllExercises(this.state.loggedInUser._id) 
      .then((result)=>{
        this.setState({
          exercisesData: result, 
          dataBaseChecked: true
        })
        this.renderChart();
      })
    })
    .catch(err=>console.log(err))
  }


  renderChart(){
      const pushUpsData = this.state.exercisesData.map((element)=>{
        return element.pushUps
      })
      const pullUpsData = this.state.exercisesData.map((element)=>{
        return element.pullUps
      })
      const plankData = this.state.exercisesData.map((element)=>{
        return element.plank
      })
      const squatsData = this.state.exercisesData.map((element)=>{
        return element.squats
      })
      const dateData = this.state.exercisesData.map((element)=>{
        return element.date
      })

      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: dateData,
              datasets: [
                {
                  label: 'pushUps',
                  backgroundColor: 'rgba(219, 132, 28, 0.2)',
                  borderColor: 'rgb(219, 132, 28)',
                  data: pushUpsData
                },{
                  label: 'pullUps',
                  backgroundColor: 'rgba(166, 0, 243, 0.2)',
                  borderColor: 'rgb(166, 0, 243)',
                  data: pullUpsData
                },{
                  label: 'plank',
                  backgroundColor: 'rgba(1, 189, 160, 0.2)',
                  borderColor: 'rgb(1, 189, 160)',
                  data: plankData
                },{
                  label: 'squats',
                  backgroundColor: 'rgba(161, 213, 0, 0.2)',
                  borderColor: 'rgb(161, 213, 0)',
                  data: squatsData
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
                fontColor: '#D6D6D6'
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
  };

  displayChart = ()=>{
    return(
      <canvas className="workouts-chart" id="myChart"></canvas>
    );
  };


  render(){
    return(
      <div className="DetailsWorkout">
        <Link to="/create-exercise">
          <Button variant="info">New workout</Button>
        </Link>
        <div className="all-exercises-container">
          {this.state.exercisesData.length === 0 
            ? this.renderLoadInfo() 
            : this.displayChart() }          
        </div>
      </div>
    )    
  }
}

export default DetailsWorkouts;