import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const FormExerciseResuls = ({ exerciseId, addResult }) => {

    const [ result, setResult ] = useState({
        reps: "",
        time: "",
        weight: "",
        date: ""
    });
    const { reps, time, weight, date } = result;


    const handleChange = (event)=>{
        const { name, value } = event.target;
        setResult({
            ...result,
            [name]: value
        });
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const resultWithId = {
            ...result,
            exerciseId
        };
        addResult(resultWithId)
        setResult({
            reps: "",
            time: "",
            weight: "",
            date: ""
        });
    };


    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Reps</label>
                <br />
                <input type="Number" name="reps" value={reps} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Weight</label>
                <br />
                <input type="Number" name="weight" value={weight} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Time</label>
                <br />
                <input type="Number" name="time" value={time} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Date</label>
                <br />
                <input type="Date" name="date" value={date} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <Button type="submit">Confirm</Button>
            </form>
        </div>
    );
};

export default FormExerciseResuls;