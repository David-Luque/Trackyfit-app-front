import React from 'react'
//import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EditExercise from './EditExercise';
import FormExerciseResults from './FormExerciseResults';
import ExerciseService from '../../services/ExerciseService'
import UserService from '../../services/UserService'
import Chart from 'chart.js';
// import '../styles/DetailsWorkout.css'

class DetailsWorkouts extends React.Component {

  state = {
    loggedInUser: null,
    exerciseData: [],
    dataBaseChecked: false,
    isRenameDisplayed: false,
    isResultsFormDisplayed: false
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

  renderLoadInfo = ()=>{ 
    if (!this.state.dataBaseChecked) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  };

  handleRenameForm = ()=>{
    this.setState({ isRenameDisplayed: !this.state.isRenameDisplayed });
  };

  deleteExercise = ()=>{
    this.exerService.deleteExercise(this.state.exerciseData._id)
    .then(response => {
      console.log(response);
      this.props.history.push("/all-exercises")
    })
  };

  handleResultsForm = ()=>{
    this.setState({ isResultsFormDisplayed: !this.state.isResultsFormDisplayed });
  };

  displayResultsForm = ()=>{
    return (
      <FormExerciseResults 
        exerciseId={this.state.exerciseData._id} 
        getExerciseInfo={this.getExerciseInfo}
        handleResultsForm={this.handleResultsForm}
      />
    )
  };

  displayChart = ()=>{
    return(
      <canvas className="workouts-chart" id="myChart"></canvas>
    );
  };


  renderChart(){
      const repsData = this.state.exerciseData.results.map((element)=>{
        return element.reps
      })
      const weightData = this.state.exerciseData.results.map((element)=>{
        return element.weight
      })
      const timeData = this.state.exerciseData.results.map((element)=>{
        return element.time
      })

      const datesData = this.state.exerciseData.results.map((element)=>{
        return element.date
      })

      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: datesData,
              datasets: [
                {
                  label: 'Reps',
                  backgroundColor: 'rgba(219, 132, 28, 0.2)',
                  borderColor: 'rgb(219, 132, 28)',
                  data: repsData
                },{
                  label: 'Weight',
                  backgroundColor: 'rgba(166, 0, 243, 0.2)',
                  borderColor: 'rgb(166, 0, 243)',
                  data: weightData
                },{
                  label: 'Time',
                  backgroundColor: 'rgba(1, 189, 160, 0.2)',
                  borderColor: 'rgb(1, 189, 160)',
                  data: timeData
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


  render(){
    return(
      <div className="DetailsWorkout">
        <h2>{this.state.exerciseData.name}</h2>
        
        <Button variant="info" onClick={this.handleResultsForm}>
          {this.state.isResultsFormDisplayed ? "Cancel" : "Add results"}
        </Button>

        {this.state.isResultsFormDisplayed && this.displayResultsForm()}
        
        <div className="all-exercises-container">
          {this.state.exerciseData === []
            ? this.renderLoadInfo() 
            : this.displayChart() }
        </div>

        <Button onClick={this.handleRenameForm}>
          {this.state.isRenameDisplayed ? "Cancel" : "Rename"}
        </Button>
        <br />    
        {this.state.isRenameDisplayed && 
          <EditExercise 
            exerciseId={this.state.exerciseData._id}
            getExerciseInfo={this.getExerciseInfo}
            handleRenameForm={this.handleRenameForm}
          />
        }

        <br />
        <hr />
        <Button onClick={this.deleteExercise}>Delete</Button>
      
      </div>
    )    
  }
}

export default DetailsWorkouts;