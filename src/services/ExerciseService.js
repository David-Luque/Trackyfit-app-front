  
import axios from "axios";


class ExerciseService {

  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });

    this.service = service;
  }

  getAllExercises = (userID) => {
    return this.service.get(`/get-all-exercises/${userID}`, {userID})
    .then(response => response.data)
  }

  addExercise = (pushUps, pullUps, plank, squats, date, owner) => {
    return this.service.post("/create-exercise", {
      pushUps,
      pullUps,
      plank,
      squats,
      date,
      owner
    })
    .then(response => response.data)
  }
}

export default ExerciseService;