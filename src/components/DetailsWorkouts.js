import React from 'react'
import '../styles/DetailsExercise.css'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import ExerciseService from '../services/ExerciseService'
import Chart from 'chart.js';


class DetailsWorkouts extends React.Component {

  state = {
    exercisesData: []
  }

  service = new ExerciseService()

  componentDidMount(){
    this.service
    .getAllExercises(this.props.loggedInUser._id) 
    .then((result)=>{
      this.setState({exercisesData: result})
      this.renderChart()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // renderExercises = ()=>{
  //   return this.state.exercises.map((exercise, index)=>{
  //     return(
  //       <Link to={`/all-exercises/${exercise._id}`} key={index}>
  //         <div className="exercise-container">
  //           <h5>{exercise.name}</h5>
  //           <p>{exercise.exerType}</p>
  //         </div>
  //       </Link>
  //     )
  //   })
  // }


  renderChart(){
    console.log('RENDER CHART workouts')

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
                fontColor: '#D6D6D6'
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
      <div className="DetailsExercise">
        <Button variant="info">
          <Link to="/create-exercise">add workout</Link>
        </Button>

        <div className="all-exercises-container">
          {this.state.exercisesData.length === 0 
            ? this.renderLoadingImage() 
            : <canvas className="workouts-chart" id="myChart"></canvas>}          
        </div>
      </div>
    )    
  }
}

export default DetailsWorkouts