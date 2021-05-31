
import React from 'react'
import '../styles/FormExercise.css'
import ExerciseService from '../../services/ExerciseService'
import { Button, Form, Alert } from 'react-bootstrap';


class FormExercise extends React.Component {

    state = {
        pushUps: null,
        pullUps: null,
        plank: null,
        squats: null,
        date: null,
        owner: null,
        dataWarningMessage: false,
        successUpload: false
    };

    service = new ExerciseService()

    componentDidMount(){
        this.setState({owner: this.props.loggedInUser._id})
    }

    handleFormSubmit = (event) => {
        if(
            !this.state.pushUps ||
            !this.state.pullUps ||
            !this.state.plank ||
            !this.state.squats ||
            !this.state.date
        ) {
            event.preventDefault();
            this.setState({dataWarningMessage: true, successUpload: false})

        } else {
            event.preventDefault();
            this.setState({dataWarningMessage: false})
            
            this.service.addExercise (
                this.state.pushUps,
                this.state.pullUps,
                this.state.plank,
                this.state.squats,
                this.state.date,
                this.state.owner,
            )
            .then(() => {
                this.setState({successUpload: true, dataWarningMessage: false})
                setTimeout(()=>{
                    this.setState({successUpload: false});
                    this.props.history.push("/details-workout")
                }, 1000);
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
            <div className="FormExercise">
                <Form className="form" onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="date">Date</Form.Label>
                        <Form.Control type="date" name="date" value={this.state.date} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="pushUps">push ups</Form.Label>
                        <Form.Control type="number" name="pushUps" placeholder="reps" value={this.state.pushUps} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="pullUps">pull ups</Form.Label>
                        <Form.Control type="number" name="pullUps" placeholder="reps" value={this.state.pullUps} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="plank">plank</Form.Label>
                        <Form.Control type="number" name="plank" placeholder=" seconds" value={this.state.plank} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="squats">squats</Form.Label>
                        <Form.Control type="number" name="squats" placeholder="reps" value={this.state.squats} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>

                    {this.state.dataWarningMessage && this.renderWarningMessage()}
                    {this.state.successUpload && this.renderSuccessMessage()}

                    <Button variant="info" type="submit">
                        Confirm
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FormExercise