import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExerciseService from '../../services/ExerciseService';

const EditExercise = ({ exerciseName, exerciseId, getExerciseInfo, handleRenameForm }) => {

    const [ name, setName ] = useState(exerciseName);

    const exerciseService = new ExerciseService();

    const handleChange = (event)=>{
        setName(event.target.value);
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        exerciseService.editExercise(exerciseId, name)
        .then(() => {
            getExerciseInfo();
            handleRenameForm();
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Set new exercise name:</label>
                <br />
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <br />
                <Button type="submit" >Edit</Button>
            </form>
        </div>
    );
};

export default EditExercise;