
import React from 'react'

import '../styles/FormMetrics.css'

import { Link, Redirect } from 'react-router-dom';

import { Button, Form } from 'react-bootstrap';

import MetricsService from '../services/MetricsService'

class FormMetrics extends React.Component {

    state = {
        weight: '',
        shoulders: '',
        abs: '',
        cuadriceps: '',
        date: '',
        owner: ''
    };

  service = new MetricsService()


    componentDidMount(){
        // const getDate = ()=>{
        //     var today = new Date();
        //     var dd = String(today.getDate()).padStart(2, '0');
        //     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //     var yyyy = today.getFullYear();
        //     today = mm + '/' + dd + '/' + yyyy;
        //     return today
        // }
        // const todayDate = getDate()

        this.setState({owner: this.props.loggedInUser._id})
    }

  handleFormSubmit = (event) => {
        event.preventDefault();
        this.service
            .addMetrics (
                this.state.weight,
                this.state.shoulders,
                this.state.abs,
                this.state.cuadriceps,
                this.state.date,
                this.state.owner,
            )
            .then((response) => {
                console.log(response)
            })
            .catch((err) => console.error(err));
            
            <Redirect to="/details-metrics" />
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


  render() {
    return (
        <div className="FormMetrics">
            
            {/* <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="weight">Weight: </label>
                <input
                    type="number"
                    name="weight"
                    value={this.state.weight}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="shoulders">shoulders: </label>
                <input
                    type="number"
                    name="shoulders"
                    value={this.state.shoulders}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="abs">abs: </label>
                <input
                    type="number"
                    name="abs"
                    value={this.state.abs}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="cuadriceps">cuadriceps: </label>
                <input
                    type="number"
                    name="cuadriceps"
                    value={this.state.cuadriceps}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <button type="submit">add entry</button>
            </form> */}

            <Form className="form" onSubmit={this.handleFormSubmit}>

                <Form.Group controlId="formBasicWeight">
                    <Form.Label htmlFor="weight">your weight</Form.Label>
                    <Form.Control type="number" name="weight" placeholder="kg" value={this.state.weight} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicShoulders">
                    <Form.Label htmlFor="shoulders">shoulders</Form.Label>
                    <Form.Control type="number" name="shoulders" placeholder="cm" value={this.state.shoulders} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicAbs">
                    <Form.Label htmlFor="abs">abs</Form.Label>
                    <Form.Control type="number" name="abs" placeholder="cm" value={this.state.abs} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicCuadriceps">
                    <Form.Label htmlFor="cuadriceps">cuadriceps</Form.Label>
                    <Form.Control type="number" name="cuadriceps" placeholder="cm" value={this.state.cuadriceps} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <Form.Control type="date" name="date" value={this.state.date} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Button variant="info" type="submit">
                    confirm
                </Button>
            </Form>
        </div>
    );
}
}

export default FormMetrics