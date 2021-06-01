import React, { Component } from 'react';
import WorkoutService from '../../services/WorkoutService';
import CreateWorkout from './CreateWorkout';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class AllWorkouts extends Component {
    
    state = {
        workouts: null
    };

    service = new WorkoutService();

    // componentDidMount = ()=>{
    //     this.getAllWorkouts();
    // };

    getAllWorkouts = ()=>{
        this.service.getWorkouts()
        .then(response => {
            this.setState({
                workouts: response
            });
        })
        .catch(err => console.log(err))
    };

    displayWorkouts = ()=>{
        return this.state.workouts.map(element => {
            return(
                <Link to={`/workouts/${element._id}`}>
                    <div>
                        <h4>{element.name}</h4>
                        <p>{element.date}</p>
                    </div>
                </Link>
            );
        });
    };

    handleCreateForm = ()=>{
        this.setState({ isCreateWorkoutDisplayed: !this.state.isCreateWorkoutDisplayed });
    };
    
    render(){
        return(
            <div>
                <h2>Workouts history</h2>
                {this.state.workouts && this.displayWorkouts()}
                <Button onClick={this.handleCreateForm}>
                    {this.state.isCreateWorkoutDisplayed ? "Cancel" : "Create Workout"}
                </Button>
                {this.state.isCreateWorkoutDisplayed && <CreateWorkout/>}
            </div>
        )
    };
};

export default AllWorkouts;