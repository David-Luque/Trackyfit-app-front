import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ResultService from '../../services/ResultsService';


const FormExerciseResuls = ({ exerciseId, getExerciseInfo, handleResultsForm }) => {

    const [ state, setState ] = useState({
        reps: "",
        time: "",
        weight: "",
        date: ""
    });

    const resultService = new ResultService();

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const { reps, time, weight, date } = state;
        const exercise = exerciseId;

        const results = { reps, time, weight, date, exercise };
        resultService.addResults(results)
        .then(() => {
            setState({
                reps: "",
                time: "",
                weight: "",
                date: ""
            })
            getExerciseInfo();
            handleResultsForm();
        })
        .catch()

    };


    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Reps</label>
                <br />
                <input type="Number" name="reps" value={state.reps} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Weight</label>
                <br />
                <input type="Number" name="weight" value={state.weight} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Time</label>
                <br />
                <input type="Number" name="time" value={state.time} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <label>Date</label>
                <br />
                <input type="Date" name="date" value={state.date} onChange={(e)=>{handleChange(e)}}/>
                <br /><br />
                <Button type="submit">Confirm</Button>
            </form>
        </div>
    );
};

export default FormExerciseResuls;