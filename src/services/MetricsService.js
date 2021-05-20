  
import axios from "axios";


class MetricsService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      //process.env.REACT_APP_API_URL,
      withCredentials: true
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