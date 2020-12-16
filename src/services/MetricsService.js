  
import axios from "axios";


class MetricsService {

  constructor() {
    let service = axios.create({
      baseURL: "https://dvdlq99-react-project.herokuapp.com",
      // "http://localhost:3000",
    });


    this.service = service;
  }

  getAllMetrics = (userID) => {
    return this.service.get(`/get-all-metrics/${userID}`, {userID})
    .then(response => response.data)
  }


  addMetrics = (weight, shoulders, abs, cuadriceps, date, owner) => {
    return this.service.post("/add-metrics", {
      weight, 
      shoulders, 
      abs, 
      cuadriceps, 
      date, 
      owner
    })
    .then(response => response.data)
  }

 
}

export default MetricsService;