import React, { useContext, useEffect } from 'react';
import WorkoutContext from '../../context/workouts/workoutContext';
import CreateWorkout from './CreateWorkout';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AllWorkouts = () => {

    const workoutContext = useContext(WorkoutContext);
    const { workouts, isCreateWorkoutFormDisplayed, getWorkouts, handleCreateWorkoutForm, createWorkout } = workoutContext;

    useEffect(()=>{
        getWorkouts();
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
    
    return(
        <div>
            <h2>Workouts history</h2>
            {workouts && displayWorkouts()}
            <Button onClick={handleCreateWorkoutForm}>
                {isCreateWorkoutFormDisplayed ? "Cancel" : "Create Workout"}
            </Button>
            {isCreateWorkoutFormDisplayed && 
                <CreateWorkout createWorkout={createWorkout}/>
            }
        </div>
    )
};

export default AllWorkouts;