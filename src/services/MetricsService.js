import axios from "axios";

class MetricsService {

  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });

    this.service = service;
  }

  getAllMetrics = () => {
    return this.service.get('/all-metrics')
    .then(response => response.data)
  }

  createMetric = (name, unit)=>{
    return this.service.post('/create-metric', { name, unit })
    .then(response => response.data)
  };

  getMetricInfo = (metricId)=>{
    return this.service.get(`/metrics/${metricId}`)
    .then(response => response.data)
  };

  deleteMetric = (metricId)=>{
    return this.service.delete(`/metrics/${metricId}`)
    .then(response => response.data)
  };

}

export default MetricsService;