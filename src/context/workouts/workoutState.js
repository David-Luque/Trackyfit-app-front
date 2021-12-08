import React, { useReducer } from "react";
import WorkoutContext from './workoutContext';
import WorkoutReducer from './workoutReducer';
import axiosClient from '../../config/axios';
import {} from '../../types';

const WorkoutState = ({ children })=>{

    const initialState = {
        workouts: null
    };

    const workoutReducer = useReducer(WorkoutReducer, initialState);
    const [ state, dispatch ] = workoutReducer;


    return (
        <WorkoutContext.Provider
            value={{
                workouts: state.workouts
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutState;