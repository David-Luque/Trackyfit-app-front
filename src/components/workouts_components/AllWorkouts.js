import React, { useState, useEffect } from 'react';
import WorkoutService from '../../services/WorkoutService';
import CreateWorkout from './CreateWorkout';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AllWorkouts = () => {
    
    const [ workouts, setWorkouts ] = useState(null);
    const [ isCreateWorkoutDisplayed, setIsCreateWorkoutDisplayed ] = useState(false);

    const workoutService = new WorkoutService();

    const getAllWorkouts = ()=>{
        workoutService.getWorkouts()
        .then(response => {
            setWorkouts(response);
        })
        .catch(err => console.log(err))
    };

    useEffect(()=>{
        getAllWorkouts();
    }, []);

    const displayWorkouts = ()=>{
        return workouts.map(element => {
            return(
                <Link to={`/workouts/${element._id}`}>
                    <div>
                        <h4>{element.name}</h4>
                        <p>{element.date}</p>
                    </div>
                </Link>
            );
        });
    };

    const handleCreateForm = ()=>{
        setIsCreateWorkoutDisplayed(!isCreateWorkoutDisplayed);
    };
    
    return(
        <div>
            <h2>Workouts history</h2>
            {workouts && displayWorkouts()}
            <Button onClick={handleCreateForm}>
                {isCreateWorkoutDisplayed ? "Cancel" : "Create Workout"}
            </Button>
            {isCreateWorkoutDisplayed && <CreateWorkout/>}
        </div>
    )
};

export default AllWorkouts;