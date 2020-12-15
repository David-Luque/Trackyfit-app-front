
import React from 'react'
import '../styles/FormExercise.css'
// import { Link } from 'react-router-dom';
import ExerciseService from '../services/ExerciseService'
import { Button, Form } from 'react-bootstrap';


class FormExercise extends React.Component {

    state = {
        pushUps: '',
        pullUps: '',
        plank: '',
        squats: '',
        date: '',
        owner: ''
    };

  service = new ExerciseService()


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
            .addExercise (
                this.state.pushUps,
                this.state.pullUps,
                this.state.plank,
                this.state.squats,
                this.state.date,
                this.state.owner,
            )
            .then((response) => {
                console.log(response)
            })
            .catch((err) => console.error(err));
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


  render() {
    return (
        <div className="FormExercise">
            
            {/* <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="exerType">Type: </label>
                <input
                    type="text"
                    name="exerType"
                    value={this.state.exerType}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="totalTime">total time: </label>
                <input
                    type="number"
                    name="totalTime"
                    value={this.state.totalTime}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <label htmlFor="totalReps">total reps: </label>
                <input
                    type="number"
                    name="totalReps"
                    value={this.state.totalReps}
                    onChange={(event) => this.handleChange(event)}
                />
                <br />
                <button type="submit">Create</button>
            </form> */}

            <Form className="form" onSubmit={this.handleFormSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label htmlFor="pushUps">push ups</Form.Label>
                        <Form.Control type="number" name="pushUps" placeholder="reps" value={this.state.pushUps} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label htmlFor="pullUps">pull ups</Form.Label>
                        <Form.Control type="number" name="pullUps" placeholder="reps" value={this.state.pullUps} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label htmlFor="plank">plank</Form.Label>
                        <Form.Control type="number" name="plank" placeholder=" seconds" value={this.state.plank} onChange={(event) => this.handleChange(event)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label htmlFor="squats">squats</Form.Label>
                        <Form.Control type="number" name="squats" placeholder="reps" value={this.state.squats} onChange={(event) => this.handleChange(event)} />
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

export default FormExercise