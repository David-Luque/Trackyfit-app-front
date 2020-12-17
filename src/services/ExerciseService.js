  
import axios from "axios";


class ExerciseService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      // "https://dvdlq99-react-project.herokuapp.com",
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