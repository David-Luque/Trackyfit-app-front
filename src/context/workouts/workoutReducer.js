import {
    GET_ALL_WORKOUTS,
    HANDLE_CREATE_WORKOUT_FORM,
    CREATE_WORKOUT
} from '../../types';

const WorkoutReducer = (state, action)=>{
    switch(action.type) {
        case GET_ALL_WORKOUTS:
            return {
                ...state,
                workouts: action.payload
            }
        case HANDLE_CREATE_WORKOUT_FORM:
            return {
                ...state,
                isCreateWorkoutFormDisplayed: !state.isCreateWorkoutFormDisplayed
            }
        case CREATE_WORKOUT:
            return {
                ...state,
                workouts: [...state, action.payload]
            }
        default:
            return state;
    }
};

export default WorkoutReducer;