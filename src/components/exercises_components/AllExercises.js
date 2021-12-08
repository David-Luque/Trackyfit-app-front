import React, { useContext, useEffect } from 'react';
import ExerciseContext from '../../context/exercises/exerciseContext';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateExercise from './CreateExercise';

const AllExercises = () => {

    const exerciseContext = useContext(ExerciseContext);
    const { exercises, isCreateFormDisplayed, getAllExercises, handleCreateForm } = exerciseContext;

    useEffect(()=>{
        getAllExercises();
    }, []);

    const renderExercises = ()=>{
        return exercises.map((element, index) => {
            return(
                <div key={index}>
                    <Link to={`/details-exercise/${element._id}`}>
                        <h4>{element.name}</h4>
                    </Link>
                </div>
            )
        });
    };


    
    return(
        <div className="allExercises">
            <h2>All Exercises</h2>
            <Button variant="info" onClick={handleCreateForm}>
                {isCreateFormDisplayed ? "Cancel" : "Create exercise"}
            </Button>
            
            {isCreateFormDisplayed && <CreateExercise />}
            
            <div>
                {exercises.length > 0 && renderExercises()}
            </div>
        </div>
    );
    
}

export default AllExercises;