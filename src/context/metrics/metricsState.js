import { useReducer } from "react";
import MetricsContext from "./metricsContext";
import MetricsReducer from "./metricsReducer";

const MetricsState = ({ children })=>{

    const initialState = {};

    const [ state, dispatch ] = useReducer(MetricsReducer, initialState);
 
    



    return (
        <MetricsContext.Provider
            value={{}}
        >
            {children}
        </MetricsContext.Provider>
    )

};

export default MetricsState;