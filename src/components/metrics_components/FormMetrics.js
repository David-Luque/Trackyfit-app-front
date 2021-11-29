import React, { useState, useEffect } from 'react'
import '../styles/FormMetrics.css'
import { Button, Form, Alert } from 'react-bootstrap';
import MetricsService from '../services/MetricsService'


const FormMetrics = ({ loggedInUser, history }) => {

    const [ state, setState ] = useState({
        weight: null,
        shoulders: null,
        abs: null,
        cuadriceps: null,
        date: null,
        owner: null,
        dataWarningMessage: false,
        successUpload: false
    });

    const metricService = new MetricsService()

    useEffect(()=>{
        setState({
            ...state,
            owner: loggedInUser._id
        })
    }, []);
    

    const handleFormSubmit = (event) => {
        if(
            !state.weight || 
            !state.shoulders ||
            !state.abs ||
            !state.cuadriceps ||
            !state.date
        ) {
            event.preventDefault();
            setState({
                ...state,
                dataWarningMessage: true,
                successUpload: false
            })

        } else {
            event.preventDefault();
            setState({
                ...state,
                dataWarningMessage: false
            })
            
            metricService.addMetrics (
                state.weight,
                state.shoulders,
                state.abs,
                state.cuadriceps,
                state.date,
                state.owner,
            )
            .then((response) => {
                setState({
                    ...state,
                    successUpload: true,
                    dataWarningMessage: false
                })
                setTimeout(()=>{
                    setState({
                        ...state,
                        successUpload: false
                    });
                    history.push("/details-metrics")
                }, 1000);
            })
            .catch((err) => console.error(err));
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const renderWarningMessage = () => {
        return <Alert variant='danger'>Some fields are empty!</Alert>
    }

    const renderSuccessMessage = () => {
        return <Alert variant='success'>successfuly uploaded</Alert>
    }


    return (
        <div className="FormMetrics">
            <Form className="form" onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicDate">
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <Form.Control type="date" name="date" value={state.date} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicWeight">
                    <Form.Label htmlFor="weight">Your weight</Form.Label>
                    <Form.Control type="number" name="weight" placeholder="kg" value={state.weight} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicShoulders">
                    <Form.Label htmlFor="shoulders">Shoulders</Form.Label>
                    <Form.Control type="number" name="shoulders" placeholder="cm" value={state.shoulders} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicAbs">
                    <Form.Label htmlFor="abs">ABS</Form.Label>
                    <Form.Control type="number" name="abs" placeholder="cm" value={state.abs} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicCuadriceps">
                    <Form.Label htmlFor="cuadriceps">Cuadriceps</Form.Label>
                    <Form.Control type="number" name="cuadriceps" placeholder="cm" value={state.cuadriceps} onChange={(e) => handleChange(e)} />
                </Form.Group>

                {state.dataWarningMessage && renderWarningMessage()}
                {state.successUpload && renderSuccessMessage()}
                
                <Button variant="info" type="submit">
                    Confirm
                </Button>
            </Form>
        </div>
    );
}

export default FormMetrics