import React from 'react';
import Service from '../../services/UserService';
import { Button, Form, Alert } from 'react-bootstrap';
import '../styles/LoginSignUp.css'
import { withRouter } from 'react-router-dom';

class LogIn extends React.Component {
	
	state = {
		username: null,
		password: null,
		message: null
	};
	
	service = new Service();
	

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.service.login(this.state.username, this.state.password)
		.then((response) => {
			this.setState({
				username: '',
				password: '',
				message: response.message
			});
			this.props.getTheUser(response);
			this.props.history.push("/profile");
		})
		.catch((err) => console.log(err));
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	
	render() {
		return (
			<div className="LogIn">
				<Form className="form" onSubmit={this.handleFormSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label htmlFor="username">Username</Form.Label>
						<Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={(event) => this.handleChange(event)} />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
					</Form.Group>

					{this.state.message && <Alert variant='dark'> {this.state.message} </Alert>}

					<Button variant="info" type="submit"> Log In </Button>
				</Form>
			</div>
		);
	}
}

export default withRouter(LogIn);
