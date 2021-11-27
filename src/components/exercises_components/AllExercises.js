import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ExerciseService from '../../services/ExerciseService';
import CreateExercise from './CreateExercise';

const AllExercises = () => {

    const [ state, setState ] = useState({
        exercisesInfo: [],
        isCreateFormDisplayed: false
    });

    const exerciseService = new ExerciseService();

    useEffect(()=>{
        getAllExercises();
    }, []);

    const getAllExercises = ()=>{
        exerciseService.getAllExercises()
        .then(resFromApi => {
            setState({
                ...state,
                exercisesInfo: resFromApi
            });
        })
        .catch(err => console.log(err))
    };

    const renderExercises = ()=>{
        return state.exercisesInfo.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-exercise/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };

    const handleCreateForm = ()=>{
        setState({
            ...state,
            isCreateFormDisplayed: !state.isCreateFormDisplayed
        });
    };


    
    return(
        <div className="allExercises">
            <h2>All Exercises</h2>
            <Button variant="info" onClick={()=>{handleCreateForm()}}>
                {state.isCreateFormDisplayed ? "Cancel" : "Create exercise"}
            </Button>
            
            {state.isCreateFormDisplayed && <CreateExercise getAllExer={getAllExercises} handleCreateForm={handleCreateForm} />}
            
            <div>
                {state.exercisesInfo.length > 0 && renderExercises()}
            </div>
        </div>
    );
    
}

export default AllExercises;