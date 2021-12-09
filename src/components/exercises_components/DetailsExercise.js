import React, { useContext, useEffect } from 'react'
import Exercisecontext from '../../context/exercises/exerciseContext';
import ResultsContext from '../../context/results/resultsContext';
import AuthContext from '../../context/auth/authContext';
//import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EditExercise from './EditExercise';
import FormExerciseResults from './FormExerciseResults';
import Chart from 'chart.js';
// import '../styles/DetailsWorkout.css'


const DetailsWorkouts = (props) => {

  const authContext = useContext(AuthContext);
  const { authenticated, user } = authContext;

  const exerciseContext = useContext(Exercisecontext);
  const { exerciseData, isRenameFormDisplayed, isDBrequestDone, getExerciseInfo, handleRenameForm, editExercise, deleteExercise } = exerciseContext;

  const resultContext = useContext(ResultsContext);
  const { isResultsFormDisplayed, handleResultsForm, addResult } = resultContext;

  
  useEffect(()=>{
    getExerciseInfo(props.match.params.id);
    renderChart();
  }, []);
  

  const renderLoadInfo = ()=>{ 
    if (!isDBrequestDone) 
    {
      return <p className="data-message"> Loading...</p>
    } else {
      return <p className="data-message"> No data yet, try to add the first one </p>  
    }
  };

  const deleteTheExercise = ()=>{
    deleteExercise(exerciseData._id);
    props.history.replace("/profile")
    props.history.push("/all-exercises")
  };

  const displayResultsForm = ()=>{
    return (
      <FormExerciseResults 
        exerciseId={exerciseData._id} 
        addResults={addResult}
      />
    )
  };

  const displayChart = ()=>{
    return(
      <canvas className="workouts-chart" id="myChart"></canvas>
    );
  };

  const renderChart = ()=>{
      const repsData = exerciseData.results.map((element)=>{
        return element.reps
      })
      const weightData = exerciseData.results.map((element)=>{
        return element.weight
      })
      const timeData = exerciseData.results.map((element)=>{
        return element.time
      })

      const datesData = exerciseData.results.map((element)=>{
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
    if(authenticated && user._id === exerciseData.owner){
      return(
        <div>
          <Button onClick={handleRenameForm}>
                {isRenameFormDisplayed ? "Cancel" : "Rename"}
              </Button>
              <br />    
              
              {isRenameFormDisplayed && 
                <EditExercise 
                  exerciseData={exerciseData}
                  editExercise={editExercise}
                />
              }

              <br />
              <hr />
          <Button onClick={deleteTheExercise}>Delete</Button>
        </div>
      )
    }
    
  };



  return(
    <div className="DetailsWorkout">
      <h2>{exerciseData.name}</h2>
      
      <Button variant="info" onClick={handleResultsForm}>
        {isResultsFormDisplayed ? "Cancel" : "Add results"}
      </Button>

      {isResultsFormDisplayed && displayResultsForm()}
        
      <div className="all-exercises-container">
        {exerciseData === null || exerciseData.results.length === 0
          ? renderLoadInfo() 
          : displayChart() }
      </div>

      {ownerCheck()}
    
    </div>
  )    
}

export default DetailsWorkouts;