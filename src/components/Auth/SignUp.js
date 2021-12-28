import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import AlertsContext from '../../context/alerts/alertsContext';

const SignUp = (props) => {

	const authContext = useContext(AuthContext);
	const { isAuthenticated, userSignup, message } = authContext;

	const alertsContext = useContext(AlertsContext);
	const { alert, showAlert } = alertsContext;

	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/profile');
		}
		if(message) {
			showAlert(message.msg, message.category);
		}
	}, [ isAuthenticated, message ])

	const [ user, setUser ] = useState({
		username: "",
		email: "",
		password: "",
		secondPassword: ""
	});
	const { username, email, password, secondPassword } = user;
	
	
	const handleFormSubmit = (event) => {
		event.preventDefault();
		if(
			username.trim() === '' ||
			email.trim() === ''||
			password.trim() === '' ||
			secondPassword.trim() === ''
		) {
			return showAlert('All fields are required', 'alert-error');
		}

		if(password.length < 6) {
			return showAlert('Password must be at least 6 characters long', 'alert-warning')
		}

		if(password !== secondPassword) {
			return showAlert('Both password must be identical', 'alert-error');
		}

		userSignup({ username, email, password })
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value
		});
	};

	
	return (
		<div className="signup">
			<Form className="signup__form" onSubmit={handleFormSubmit}>
				
				<Form.Group>
					<Form.Label htmlFor="username">Username</Form.Label>
					<Form.Control type="text" name="username" placeholder="Enter your username" value={username} onChange={(e) => handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control type="email" name="email" placeholder="Your email" value={email} onChange={(e) => handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Set password" value={password} onChange={(e) => handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name="secondPassword" placeholder="Repeat your password" value={secondPassword} onChange={(e) => handleChange(e)} />
				</Form.Group>

				{alert && <Alert alert={alert} variant='dark' />}
				
				<Button variant="info" type="submit"> Sign Up </Button>
			</Form>
			<p className='signup__login-access'>
				Do yo have an account yet? 
				<Link to={"/login"}>Login here</Link>
			</p>
		</div>
	);
}

export default SignUp;
