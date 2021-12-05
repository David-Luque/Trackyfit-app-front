import {
    GET_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE,
    GET_EXERCISE_INFO,
    DELETE_EXERCISE
} from '../../types';

const ExerciseReducer = (state, action)=>{
    switch(action.type) {
        case GET_EXERCISES:
            return {
                ...state,
                exercises: action.payload
            }
        case ADD_EXERCISE:
            return console.log(action.payload)
        case EDIT_EXERCISE:
            return console.log(action.payload)
        case GET_EXERCISE_INFO:
            return {
                ...state,
                exerciseData: action.payload
            }
        case DELETE_EXERCISE:
            return {
                ...state,
                exerciseData: null
            }
        default:
            return state;
    }
};

export default ExerciseReducer;