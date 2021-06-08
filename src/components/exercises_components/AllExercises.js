import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ExerciseService from '../../services/ExerciseService';
import CreateExercise from './CreateExercise';

class AllExercises extends Component {

    state = {
        exercisesInfo: [],
        isCreateFormDisplayed: false
    };

    service = new ExerciseService();

    componentDidMount = ()=>{
        this.getAllExercises();
    };

    getAllExercises = ()=>{
        this.service.getAllExercises()
        .then(resFromApi => {
            this.setState({ exercisesInfo: resFromApi });
        })
        .catch(err => console.log(err))
    };

    renderExercises = ()=>{
        return this.state.exercisesInfo.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-exercise/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };

    handleCreateForm = ()=>{
        this.setState({ isCreateFormDisplayed: !this.state.isCreateFormDisplayed });
    };


    render(){
        return(
            <div className="allExercises">
                <h2>All Exercises</h2>
                <Button variant="info" onClick={()=>{this.handleCreateForm()}}>
                    {this.state.isCreateFormDisplayed ? "Cancel" : "Create exercise"}
                </Button>
                
                {this.state.isCreateFormDisplayed && <CreateExercise getAllExer={this.getAllExercises} handleCreateForm={this.handleCreateForm} />}
                
                <div>
                    {this.state.exercisesInfo.length > 0 && this.renderExercises()}
                </div>
            </div>
        );
    };
}

export default AllExercises;