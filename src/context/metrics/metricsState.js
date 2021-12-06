import { useReducer } from "react";
import axiosClient from "../../config/axios";
import MetricsContext from "./metricsContext";
import MetricsReducer from "./metricsReducer";
import {
    GET_ALL_METRICS,
    CREATE_METRIC,
    HANDLE_METRIC_FORM,
    GET_METRIC_INFO,
    EDIT_METRIC,
    DELETE_METRIC
} from '../../types';

const MetricsState = ({ children })=>{

    const initialState = {
        metrics: null,
        metricInfo: null,
        isCreateFormDisplayed: false
    };

    const [ state, dispatch ] = useReducer(MetricsReducer, initialState);
 
    
    const getAllMetrics = async () => {
        const response = await axiosClient.get('/metrics');
        try {
            dispatch({
                type: GET_ALL_METRICS,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateForm = () => {
        dispatch({
            type: HANDLE_METRIC_FORM
        });
    };
    
    const createMetric =  async (metric)=>{
        try {
            const response = await axiosClient.post('/metrics', metric);
            dispatch({
                type: CREATE_METRIC,
                payload: response
            });
            getAllMetrics();
            handleCreateForm();
        } catch(err) {
            console.log(err)
        }
    };

    const getMetricInfo = async (id)=>{
        try {
            const response = await axiosClient.get(`/metrics/${id}`);
            dispatch({
                type: GET_METRIC_INFO,
                payload: response
            });
        } catch (err) {
            console.log(err)
        }
    };

    const editMetric = async (id, metric)=>{
        try {
            const response = await axiosClient.put(`/metrics/${id}`, metric);
            dispatch({
                type: EDIT_METRIC,
                payload: response
            });
            //getMetricInfo();
        } catch(err) {
            console.log(err)
        }
    };

    const deleteMetric = (id)=>{
        try {
            const response = axiosClient.delete(`/metrics/${id}`);
            console.log(response)
            dispatch({
                type: DELETE_METRIC
            })
            getAllMetrics();
        } catch (err) {
            console.log(err)
        }
    };



    return (
        <MetricsContext.Provider
            value={{
                metrics: state.metrics,
                getAllMetrics,
                createMetric,
                getMetricInfo,
                editMetric,
                deleteMetric
            }}
        >
            {children}
        </MetricsContext.Provider>
    )

};

export default MetricsState;