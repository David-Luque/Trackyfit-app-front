import axios from 'axios';

class WorkoutService {
    constructor(){
        const service = axios.create({
            baseURL: `${process.env.TRACKYFIT_API_URL}`,
            withCredentials: true
        });
        
        this.service = service;
    }

    getWorkouts = ()=>{
        return this.service.get('/all-workouts')
        .then(response => response.data)
    };

    createWorkout = (theWorkout)=>{
        return this.service.post('/workouts', theWorkout)
        .then(response => response.data)
    };
}

export default WorkoutService;