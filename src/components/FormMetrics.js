
import React from 'react'
import '../styles/FormMetrics.css'
// import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import MetricsService from '../services/MetricsService'


class FormMetrics extends React.Component {

    state = {
        // weight: '',
        // shoulders: '',
        // abs: '',
        // cuadriceps: '',
        // date: '',
        // owner: ''
        dataWarningMessage: false,
        successUpload: false
    };

  service = new MetricsService()

    componentDidMount(){
        this.setState({owner: this.props.loggedInUser._id})
    }


    handleFormSubmit = (event) => {
        //event.preventDefault();

        if(
            !this.state.weight || 
            !this.state.shoulders ||
            !this.state.abs ||
            !this.state.cuadriceps ||
            !this.state.date
        ) {
            event.preventDefault();
            this.setState({dataWarningMessage: true, successUpload: false})

        } else {
            event.preventDefault();
            console.log("enviado!")
            this.setState({dataWarningMessage: false})
            
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
                this.setState({successUpload: true, dataWarningMessage: false})
                setTimeout(()=>{
                    this.setState({successUpload: false})
                }, 2000);
            })
            .catch((err) => console.error(err));
        }
    };


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    renderWarningMessage = () => {
        return <Alert variant='danger'>Some fields are empty!</Alert>
    }

    renderSuccessMessage = () => {
        return <Alert variant='success'>successfuly uploaded</Alert>
    }


  render() {
    return (
        <div className="FormMetrics">

            {this.state.dataWarningMessage && this.renderWarningMessage()}
            {this.state.successUpload && this.renderSuccessMessage()}

            <Form className="form" onSubmit={this.handleFormSubmit}>
                <Form.Group controlId="formBasicDate">
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <Form.Control type="date" name="date" value={this.state.date} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicWeight">
                    <Form.Label htmlFor="weight">Your weight</Form.Label>
                    <Form.Control type="number" name="weight" placeholder="kg" value={this.state.weight} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicShoulders">
                    <Form.Label htmlFor="shoulders">Shoulders</Form.Label>
                    <Form.Control type="number" name="shoulders" placeholder="cm" value={this.state.shoulders} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicAbs">
                    <Form.Label htmlFor="abs">ABS</Form.Label>
                    <Form.Control type="number" name="abs" placeholder="cm" value={this.state.abs} onChange={(event) => this.handleChange(event)} />
                </Form.Group>

                <Form.Group controlId="formBasicCuadriceps">
                    <Form.Label htmlFor="cuadriceps">Cuadriceps</Form.Label>
                    <Form.Control type="number" name="cuadriceps" placeholder="cm" value={this.state.cuadriceps} onChange={(event) => this.handleChange(event)} />
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