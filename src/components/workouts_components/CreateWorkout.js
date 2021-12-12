import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const CreateWorkout = ({ createWorkout }) => {

    const [ workout, setWorkout ] = useState({
        name: "",
        date: ""
    });
    const { name, date } = workout;

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setWorkout({
            ...workout,
            [name]: value
        });
    };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        if(
            name.trim() === '' ||
            date.trim() === ''
        ) {
            return 'Error message' //include AlertContext here
        }
        createWorkout(workout);
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit} >
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                <label>Date</label>
                <input type="date" name="date" value={date} onChange={(e)=>{handleChange(e)}} />
                <br /><br />
                <Button type="submit">Create</Button>
            </form>
            
        </div>
    );
};

export default CreateWorkout;