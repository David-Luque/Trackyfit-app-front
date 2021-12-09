import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const EditExercise = ({ exerciseData, editExercise }) => {

    const [ name, setName ] = useState(exerciseData.name);

    const handleChange = (event)=>{
        setName(event.target.value);
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        const newExercise = {
            ...exerciseData,
            name
        }
        editExercise(exerciseData._id, newExercise);
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>New exercise name:</label>
                <br />
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <br />
                <Button type="submit" >Edit</Button>
            </form>
        </div>
    );
};

export default EditExercise;