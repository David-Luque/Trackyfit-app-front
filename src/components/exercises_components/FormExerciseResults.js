import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ResultService from '../../services/ResultsService';


class FormExerciseResuls extends Component {

    state = {
        reps: "",
        time: "",
        weight: "",
        date: ""
    };

    service = new ResultService();

    handleChange = (event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e)=>{
        e.preventDefault();

        const { reps, time, weight, date } = this.state;
        const exercise = this.props.exerciseId;

        const results = { reps, time, weight, date, exercise };
        //console.log(results)
        this.service.addResults(results)
        .then(response => {
            this.setState({
                reps: "",
                time: "",
                weight: "",
                date: ""
            })
            this.props.getExerciseInfo();
            this.props.handleResultsForm();
        })
        .catch()

    };


    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Reps</label>
                    <br />
                    <input type="Number" name="reps" value={this.state.reps} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Weight</label>
                    <br />
                    <input type="Number" name="weight" value={this.state.weight} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Time</label>
                    <br />
                    <input type="Number" name="time" value={this.state.time} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <label>Date</label>
                    <br />
                    <input type="Date" name="date" value={this.state.date} onChange={(e)=>{this.handleChange(e)}}/>
                    <br /><br />
                    <Button type="submit">Confirm</Button>
                </form>
            </div>
        );
    };
};

export default FormExerciseResuls;