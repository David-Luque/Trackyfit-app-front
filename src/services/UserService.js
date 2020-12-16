  
import axios from "axios";


class UserService {

  constructor() {
    let service = axios.create({
      baseURL: "https://dvdlq99-react-project.herokuapp.com",
      // "http://localhost:3000",
      withCredentials: true
    });


    this.service = service;
  }

  signup = (username, password) => {
    return this.service.post("/signup", {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    console.log('login de service')
    return this.service.post("/login", {username, password})
    .then(response => response.data)
  }

  loggedin = () =>{
    return this.service.get("/loggedin")
    .then(response => response.data)
  }

  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
  }

  logout = () =>{
    return this.service.post("/logout", {})
    .then(response => response.data)
  }
}

export default UserService;