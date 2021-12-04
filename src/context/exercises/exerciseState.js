import React, { useReducer } from "react";
import axiosClient from '../../config/axios';
import Exercisecontext from "./exerciseContext";
import ExerciseReducer from './exerciseReducer';
import {
    GET_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE
} from '../../types';

const ExerciseState = ({ children })=>{

    const initialState = {
        exercises: null
    };

    const [ state, dispatch ] = useReducer(ExerciseReducer, initialState);

    const getAllExercises = async () => {
        try {
            const response = await axiosClient.get('/all-exercises');
            dispatch({
                type: GET_EXERCISES,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };

    const createExercise = async (exercise) => {
        try {
            const response = await axiosClient.post('/create-exercise', exercise);
            console.log(response)
            dispatch({
                type: ADD_EXERCISE,
                payload: response
            })
            getAllExercises();
            //handleCreateForm();
        } catch (err) {
            console.log(err);
        }
    };

    const editExercise = async (id, exercise) => {
        try {
            const response = await axiosClient.put(`edit-exercise/${id}`, exercise);
            console.log(response)
            dispatch({
                type: EDIT_EXERCISE,
                payload: response
            });
            // getExerciseInfo();
            // handleRenameForm();
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <Exercisecontext.Provider
            value={{
                exercises: state.exercises,
                getAllExercises,
                createExercise,
                editExercise
            }}
        >
            {children}
        </Exercisecontext.Provider>
    )
};

export default ExerciseState;