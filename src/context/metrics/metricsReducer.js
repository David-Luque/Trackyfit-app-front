import {
    GET_ALL_METRICS,
    CREATE_METRIC,
    HANDLE_CREATE_METRIC_FORM,
    HANDLE_EDIT_METRIC_FORM,
    GET_METRIC_INFO,
    EDIT_METRIC,
    DELETE_METRIC
} from '../../types';

const MetricsReducer = (state, action) => {
    switch(action.type) {
        case GET_ALL_METRICS:
            return {
                ...state,
                metrics: action.payload
            }
        case HANDLE_CREATE_METRIC_FORM:
            return {
                ...state,
                isCreateFormDisplayed: !state.isCreateFormDisplayed
            }
        case CREATE_METRIC:
            return console.log(action.payload)
            //request to get all metrics again or push to local state?
        case GET_METRIC_INFO:
            console.log(action.payload)
            return {
                ...state,
                metricInfo: action.payload,
                isDBrequestDone: true
            }
        case HANDLE_EDIT_METRIC_FORM:
            return {
                ...state,
                isEditMeasureFormDisplayed: !state.isEditMeasureFormDisplayed
            }
        case EDIT_METRIC:
            return console.log(action.payload)
            //set directly in state? or recall "getMetricInfo"?
        case DELETE_METRIC:
            return {
                ...state,
                metricInfo: null
            }
        default:
            return state;
    }
};

export default MetricsReducer;