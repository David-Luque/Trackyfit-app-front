import React from 'react'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EditExercise from './EditExercise';
import ExerciseService from '../../services/ExerciseService'
import UserService from '../../services/UserService'
import Chart from 'chart.js';
// import '../styles/DetailsWorkout.css'

class DetailsWorkouts extends React.Component {

  state = {
    loggedInUser: null,
    exerciseData: "",
    dataBaseChecked: false,
    isRenameDisplayed: false
  }

  exerService = new ExerciseService()
  userService = new UserService()

  componentDidMount(){
    this.userService.loggedIn()
    .then((response)=>{
      this.setState({loggedInUser: response})
    })
    .catch(err=>console.log(err))
    .then(()=>{
      this.getExerciseInfo();
    })
    .catch(err=>console.log(err))
  }
  
  getExerciseInfo = ()=>{
    this.exerService.getExerciseInfo(this.props.match.params.id) 
      .then((resFromApi)=>{
        this.setState({
          exerciseData: resFromApi, 
          dataBaseChecked: true
        })
        this.renderChart();
      })
      .catch(err=>console.log(err))
  };

  renderChart(){
      const pushUpsData = this.state.exerciseData.map((element)=>{
        return element.pushUps
      })
      const pullUpsData = this.state.exerciseData.map((element)=>{
        return element.pullUps
      })
      const plankData = this.state.exerciseData.map((element)=>{
        return element.plank
      })
      const squatsData = this.state.exerciseData.map((element)=>{
        return element.squats
      })
      const dateData = this.state.exerciseData.map((element)=>{
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

  handleRenameForm = ()=>{
    this.setState({ isRenameDisplayed: !this.state.isRenameDisplayed });
  };


  render(){
    return(
      <div className="DetailsWorkout">
        <h2>{this.state.exerciseData.name}</h2>
        <Link to="/create-exercise">
          <Button variant="info">Add new results</Button>
        </Link>
        <div className="all-exercises-container">
          {this.state.exerciseData === null
            ? this.renderLoadInfo() 
            : this.displayChart() }          
        </div>

        <Button onClick={this.handleRenameForm}>
          {this.state.isRenameDisplayed ? "Cancel" : "Rename"}
        </Button>
        <Button>Delete</Button>
        <hr />
        {this.state.isRenameDisplayed && 
          <EditExercise 
            exerciseId={this.state.exerciseData._id}
            getExerciseInfo={this.getExerciseInfo}
            handleRenameForm={this.handleRenameForm}
          />
        }
      </div>
    )    
  }
}

export default DetailsWorkouts;