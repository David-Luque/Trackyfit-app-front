import axios from 'axios';

class MeasureService {
    constructor(){
        const service = axios.create({
            baseURL: `${process.env.TRACKYFIT_API_URL}`,
            withCredentials: true
        });
        
        this.service = service;
    };

    addMeasure = (theMeasure)=>{
        return this.service.post('/measure', { theMeasure })
        .then(response => response.data)
    }
}

export default MeasureService;