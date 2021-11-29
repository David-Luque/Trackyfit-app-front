import axios from 'axios';

class ResultServices {
    constructor(){
        const service = axios.create({
            baseURL: `${process.env.TRACKYFIT_API_URL}`,
            withCredentials: true
        });
        this.service = service;
    };

    addResults = (results)=>{
        return this.service.post('/create-results', results)
        .then(response => response.data)
    };
};

export default ResultServices;