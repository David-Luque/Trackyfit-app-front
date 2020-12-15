import React from 'react'
//import { Link } from 'react-router-dom';
import ExerciseService from '../services/ExerciseService';
import '../styles/DetailsExercise.css'
import Chart from 'chart.js';

class DetailsExercise extends React.Component{

  state = {
    exerciseInfo: {}
  }

  service = new ExerciseService()


  componentDidMount(){
    this.service.
    getOneExercise(this.props.loggedInUser._id) //exerciseName
    .then((result)=>{
      this.setState({exerciseInfo: result})
      this.renderChart()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h2>{this.state.mangaInfo.title_english}</h2>
        <img src={this.state.mangaInfo.image_url} alt={this.state.mangaInfo.title_english}/>
        {this.renderButtons()}
      </div>
    )    
  }
}

export default DetailsExercise