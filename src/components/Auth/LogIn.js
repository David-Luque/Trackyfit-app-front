import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import AlertsContext from '../../context/alerts/alertsContext';

const LogIn = (props) => {
	
	const authContext = useContext(AuthContext);
	const { isAuthenticated, userLogin, message } = authContext;

	const alertsContext = useContext(AlertsContext);
	const { alert, showAlert } = alertsContext;
	
	useEffect(()=>{
		if(isAuthenticated) {
			props.onSubmithistory.push('/profile')
		};
		if(message) {
			showAlert(message.msg, message.category)
		}
	}, [ isAuthenticated, message ]);


	const [ user, setUser ] = useState({
		email: "",
		password: ""
	});
	const { email, password } = user;
	
	

	const handleFormSubmit = (event) => {
		event.preventDefault();
		
		if(email.trim() === '' || password.trim() === '') {
			return showAlert('All fields are required', 'alert-error')
		}

		userLogin({email, password});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value
		});
	};


	return (
		<div className="LogIn">
			<Form className="form" onSubmit={handleFormSubmit}>
				<Form.Group>
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => handleChange(e)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Your password" value={password} onChange={(e) => handleChange(e)} />
				</Form.Group>

				{alert && <Alert alert={alert} variant='dark' />}

				<Button variant="info" type="submit"> Log In </Button>
			</Form>
			<p> 
				Do not have an account yet?
				<Link to={'/signup'}>Sign up here</Link>
			</p>
		</div>
	);
}

export default LogIn;
