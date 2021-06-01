import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CreateExercise extends Component {

    state = {
        name: "",
        date: ""
    };

    //service = new ExerciseService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event)=>{
        event.preventDefault();
        const newWorkout = {
            name: this.state.name,
            date: this.state.date
        };
        this.service.createWorkout(newWorkout)
        .then(response => {
            // console.log(response)
            // this.props.getAllExer();
            // this.props.handleCreateForm();
        })
        .catch(err => console.log(err))
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit} >
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}} />
                    <label>Date</label>
                    <input type="date" name="date" value={this.state.date} onChange={(e)=>{this.handleChange(e)}} />
                    <br /><br />
                    <Button type="submit">Create</Button>
                </form>
                
            </div>
        );
    };
};

export default CreateExercise;