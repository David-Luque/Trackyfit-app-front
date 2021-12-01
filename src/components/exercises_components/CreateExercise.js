import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExerciseService from '../../services/ExerciseService';

const CreateExercise = ({ getAllExer, handleCreateForm }) => {

    const [ name, setName ] = useState("");

    const exerciseService = new ExerciseService();

    const handleChange = (event)=>{
        setName(event.target.value);
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        exerciseService.createExercise(name)
        .then(() => {
            getAllExer();
            handleCreateForm();
        })
        .catch(err => console.log(err.response))
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <br /><br />
                <Button type="submit">Create</Button>
            </form>
            
        </div>
    );
};

export default CreateExercise;