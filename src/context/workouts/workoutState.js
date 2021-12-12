import React, { useReducer } from "react";
import WorkoutContext from './workoutContext';
import WorkoutReducer from './workoutReducer';
import axiosClient from '../../config/axios';
import {
    GET_ALL_WORKOUTS,
    HANDLE_CREATE_WORKOUT_FORM,
    CREATE_WORKOUT
} from '../../types';

const WorkoutState = ({ children })=>{

    const initialState = {
        workouts: null,
        isCreateWorkoutFormDisplayed: false
    };

    const workoutReducer = useReducer(WorkoutReducer, initialState);
    const [ state, dispatch ] = workoutReducer;

    const getWorkouts = async ()=>{
        try {
            const response = await axiosClient.get('/workouts');
            dispatch({
                type: GET_ALL_WORKOUTS,
                payload: response
            });
        } catch(err) {
            console.log(err)
        }
    };

    const handleCreateWorkoutForm = ()=>{
        dispatch({
            type: HANDLE_CREATE_WORKOUT_FORM
        });
    };

    const createWorkout = async (workout)=>{
        try {
            const response = await axiosClient.post('/workouts', workout);
            dispatch({
                type: CREATE_WORKOUT,
                payload: response
            });
            handleCreateWorkoutForm();
            //getWorkouts()
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <WorkoutContext.Provider
            value={{
                workouts: state.workouts,
                isCreateWorkoutFormDisplayed: state.isCreateWorkoutFormDisplayed,
                getWorkouts,
                handleCreateWorkoutForm,
                createWorkout
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutState;