import axios from "axios";

class ExerciseService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });

    this.service = service;
  }

  // getAllExercises = () => {
  //   return this.service.get('/all-exercises')
  //   .then(response => response.data)
  // }

  // createExercise = (name) => {
  //   console.log(name)
  //   return this.service.post('/create-exercise', { name })
  //   .then(response => response.data)
  // }

  // editExercise = (id, name)=>{
  //   return this.service.put(`/edit-exercise/${id}`, { name })
  //   .then(response => response.data)
  // };

  // getExerciseInfo = (id)=>{
  //   return this.service.get(`/exercises/${id}`)
  //   .then(response => response.data)
  // };

  // deleteExercise = (id)=>{
  //   return this.service.delete(`/exercises/${id}`)
  // };
};

export default ExerciseService;