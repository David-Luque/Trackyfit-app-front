import React, { useReducer } from "react";
import axiosClient from '../../config/axios';
import Exercisecontext from "./exerciseContext";
import ExerciseReducer from './exerciseReducer';
import {
    GET_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE,
    GET_EXERCISE_INFO,
    DELETE_EXERCISE,
    HANDLE_CREATE_EX_FORM,
    HANDLE_RENAME_EX_FORM
} from '../../types';

const ExerciseState = ({ children })=>{

    const initialState = {
        exercises: null,
        exerciseData: null,
        isCreateFormDisplayed: false,
        isRenameFormDisplayed: false,
        isDBrequestDone: false
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
            handleCreateForm();
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
            getExerciseInfo();
            handleRenameForm();
        } catch (err) {
            console.log(err);
        }
    };

    const getExerciseInfo = async (id) => {
        try {
            const response = await axiosClient.get(`/exercises/${id}`);
            console.log(response)
            dispatch({
                type: GET_EXERCISE_INFO,
                payloda: response
            });
        } catch (err) {
            console.log(err)
        }
    };

    const deleteExercise = async (id) => {
        try {
            const response = await axiosClient.delete(`/exercises/${id}`);
            console.log(response)
            dispatch({
                type: DELETE_EXERCISE
            })
        } catch (err) {
            console.log(err)
        }
    };

    const handleCreateForm = ()=>{
        dispatch({
            type: HANDLE_CREATE_EX_FORM
        })
    };

    const handleRenameForm = ()=>{
        dispatch({
            type: HANDLE_RENAME_EX_FORM
        })
    };


    return(
        <Exercisecontext.Provider
            value={{
                exercises: state.exercises,
                exerciseData: state.exerciseData,
                isCreateFormDisplayed: state.isCreateFormDisplayed,
                isRenameFormDisplayed: state.isRenameFormDisplayed,
                getAllExercises,
                createExercise,
                editExercise,
                getExerciseInfo,
                deleteExercise,
                handleCreateForm,
                handleRenameForm
            }}
        >
            {children}
        </Exercisecontext.Provider>
    )
};

export default ExerciseState;