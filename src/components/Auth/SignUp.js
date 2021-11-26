import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { Button, Form, Alert } from 'react-bootstrap';
import '../../styles/LoginSignUp.css'
import { withRouter } from 'react-router-dom';

const SignUp = ({ getTheUser, history }) => {
	
	const [ state, setState ] = useState({
		username: "",
		password: "",
		message: null
	});
	

	const userService = new UserService();
	

	const handleFormSubmit = (event) => {
		event.preventDefault();
		userService.signup(state.username, state.password)
		.then((response) => {
			setState({
				username: "",
				password: "",
				message: response.message
			});
			getTheUser(response);
			history.push("/profile")
		})
		.catch((err) => console.error(err));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState({
			...state,
			[name]: value
		});
	};

	
	return (
		<div className="SignUp">
			<Form className="form" onSubmit={handleFormSubmit}>
				
				<Form.Group>
					<Form.Label htmlFor="username">Username</Form.Label>
					<Form.Control type="text" name="username" placeholder="Enter username" value={state.username} onChange={(e) => handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password" value={state.password} onChange={(e) => handleChange(e)} />
				</Form.Group>

				{state.message && <Alert variant='dark'> {state.message} </Alert>}
				
				<Button variant="info" type="submit"> Sign Up </Button>
			</Form>
		</div>
	);
}

export default withRouter(SignUp);
