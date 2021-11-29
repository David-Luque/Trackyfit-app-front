import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import WorkoutService from '../../services/WorkoutService';

const CreateExercise = ({ getAllExer, handleCreateForm }) => {

    const [ state, setState ] = useState({
        name: "",
        date: ""
    });

    const workoutService = new WorkoutService();

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        const newWorkout = {
            name: state.name,
            date: state.date
        };
        workoutService.createWorkout(newWorkout)
        .then(() => {
            getAllExer();
            handleCreateForm();
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Name</label>
                <input type="text" name="name" value={state.name} onChange={(e)=>{handleChange(e)}} />
                <label>Date</label>
                <input type="date" name="date" value={state.date} onChange={(e)=>{handleChange(e)}} />
                <br /><br />
                <Button type="submit">Create</Button>
            </form>
            
        </div>
    );
};

export default CreateExercise;