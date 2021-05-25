import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ExerciseService from '../../services/ExerciseService';

class EditExercise extends Component {

    state = {
        name: "",
    };

    service = new ExerciseService();

    handleChange = (event)=>{
        this.setState({ name: event.target.value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        this.service.editExercise(this.props.exerciseId, this.state.name)
        .then(response => {
            console.log(response);
            this.props.getAllExer();
        })
        .catch(err => console.log(err))
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit} >
                    <label>Set new exercise name:</label>
                    <br />
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <br />
                    <Button>Edit</Button>
                </form>
            </div>
        );
    };
};

export default EditExercise;