import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EditExercise from './EditExercise';
import FormExerciseResults from './FormExerciseResults';
import ExerciseService from '../../services/ExerciseService'
import UserService from '../../services/UserService'
import Chart from 'chart.js';
// import '../styles/DetailsWorkout.css'

//TODO: fix empty chart and alert message with no data

const DetailsWorkouts = ({ match, history, loggedInUser }) => {

  const [ state, setState ] = useState({
    loggedInUser: null,
    exerciseData: "",
    dataBaseChecked: false,
    isRenameDisplayed: false,
    isResultsFormDisplayed: false
  });

  const exerService = new ExerciseService()
  const userService = new UserService()

  useEffect(()=>{
    fetchUser()
    getExerciseInfo();
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
  
  const getExerciseInfo = ()=>{
    exerService.getExerciseInfo(match.params.id) 
      .then((resFromApi)=>{
        setState({
          ...state,
          exerciseData: resFromApi, 
          dataBaseChecked: true
        })
        this.renderChart();
      })
      .catch(err=>console.log(err))
  };

  const renderLoadInfo = ()=>{ 
    if (!state.dataBaseChecked) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  };

  const handleRenameForm = ()=>{
    setState({ 
      ...state,
      isRenameDisplayed: !state.isRenameDisplayed
    });
  };

  const deleteExercise = ()=>{
    exerService.deleteExercise(state.exerciseData._id)
    .then(response => {
      //console.log(response);
      history.replace("/profile")
      history.push("/all-exercises")
    })
  };

  const handleResultsForm = ()=>{
    setState({
      ...state,
      isResultsFormDisplayed: !state.isResultsFormDisplayed
    });
  };

  const displayResultsForm = ()=>{
    return (
      <FormExerciseResults 
        exerciseId={state.exerciseData._id} 
        getExerciseInfo={getExerciseInfo}
        handleResultsForm={handleResultsForm}
      />
    )
  };

  const displayChart = ()=>{
    return(
      <canvas className="workouts-chart" id="myChart"></canvas>
    );
  };

  const renderChart = ()=>{
      const repsData = state.exerciseData.results.map((element)=>{
        return element.reps
      })
      const weightData = state.exerciseData.results.map((element)=>{
        return element.weight
      })
      const timeData = state.exerciseData.results.map((element)=>{
        return element.time
      })

      const datesData = state.exerciseData.results.map((element)=>{
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
  };

  const ownerCheck = ()=>{
    if(loggedInUser && loggedInUser._id === state.exerciseData.owner){
      return(
        <div>
          <Button onClick={handleRenameForm}>
                {state.isRenameDisplayed ? "Cancel" : "Rename"}
              </Button>
              <br />    
              
              {state.isRenameDisplayed && 
                <EditExercise 
                  exerciseId={state.exerciseData._id}
                  getExerciseInfo={getExerciseInfo}
                  handleRenameForm={handleRenameForm}
                  exerciseName={state.exerciseData.name}
                />
              }

              <br />
              <hr />
          <Button onClick={deleteExercise}>Delete</Button>
        </div>
      )
    }
    
  };



  return(
    <div className="DetailsWorkout">
      <h2>{state.exerciseData.name}</h2>
      
      <Button variant="info" onClick={handleResultsForm}>
        {state.isResultsFormDisplayed ? "Cancel" : "Add results"}
      </Button>

      {state.isResultsFormDisplayed && displayResultsForm()}
        
      <div className="all-exercises-container">
        {state.exerciseData === "" || state.exerciseData.results.length === 0
          ? renderLoadInfo() 
          : displayChart() }
      </div>

      {ownerCheck()}
    
    </div>
  )    
}

export default DetailsWorkouts;