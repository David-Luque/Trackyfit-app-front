import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ExerciseContext from '../../context/exercises/exerciseContext';

const CreateExercise = () => {

    const exerciseContext = useContext(ExerciseContext);
    const { createExercise } = exerciseContext;

    const [ name, setName ] = useState('');

    const handleChange = (event)=>{
        setName(event.target.value);
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        createExercise(name)
        setName('');
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