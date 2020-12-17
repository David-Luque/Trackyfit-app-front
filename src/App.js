import React from 'react';
import SignUp from './components/SignUp';
import Home from './components/Home';
import DetailsWorkouts from './components/DetailsWorkouts';
import FormExercise from './components/FormExercise';
import FormMetrics from './components/FormMetrics';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import DetailsMetrics from './components/DetailsMetrics';
import NavComp from './components/Navbar';
import { Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null,
			publicProfileId: ''
		};
		this.service = new UserService();
	}

	fetchUser() {
		if (this.state.loggedInUser === null) {
			this.service
			.loggedin()
			.then((response) => {
				this.setState({
					loggedInUser: response
				});
			})
			.catch((err) => {
				this.setState({
					loggedInUser: false
				});
			});
		}
	}

	getUser = (userObj, message) => {
		if(
			message === 'Provide username and password' ||
			message === 'Password must be longer' ||
			message === 'Username already exist' ||
			message === 'User successfully registered' ||
			message === 'Please, insert valid username and password' 
		) {
			return
		}
		this.setState({
			loggedInUser: userObj
		});
	};

	getProfilePublicId = (id) => {
		this.setState({
			publicProfileId: id
		});
	};

	logOut = ()=>{
		this.service.logout()
		.then((result)=>{
		  console.log(result)
		  this.setState({loggedInUser: null})
		})
		.catch(err => console.log(err))
	  }

	render() {

		this.fetchUser()
		
		return (
			<div className="App">
				
				{this.state.isLogged
					? <NavComp loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>
					: <NavComp loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>
				}

				<Route path="/signup" render={() => (
					!this.state.loggedInUser 
					? (
						<SignUp
							submitSignUp={this.submitSignUp}
							newUser={this.state.newUser}
							changeHandlerSignUp={this.changeHandlerSignUp}
							getUser={this.getUser}
								/>
					) : <Redirect to="/" />
				)} />
				<Route path="/login" render={() => !this.state.loggedInUser ? <LogIn getUser={this.getUser} /> : <Redirect to="/" />} />

				<Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />
				
				<Route path="/user-profile" render={() => this.state.loggedInUser ? <UserProfile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/"/> } />
				<Route exact path="/details-workout" render={() => this.state.loggedInUser ? <DetailsWorkouts loggedInUser={this.state.loggedInUser} /> : <Redirect to="/"/>} />
				<Route exact path="/details-metrics" render={() => this.state.loggedInUser ? <DetailsMetrics loggedInUser={this.state.loggedInUser} /> : <Redirect to="/"/>} />
				<Route path="/create-exercise" render={()=> this.state.loggedInUser ? <FormExercise loggedInUser={this.state.loggedInUser} /> : <Redirect to="/"/>} />
				<Route path="/add-new-metrics" render={()=> this.state.loggedInUser ? <FormMetrics loggedInUser={this.state.loggedInUser} /> : <Redirect to="/"/>} />
				
			</div>
		);
	}
}

export default App;

