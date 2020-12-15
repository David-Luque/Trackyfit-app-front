import React from 'react';
import './App.css';


import SignUp from './components/SignUp';
import Home from './components/Home';
import DetailsWorkouts from './components/DetailsWorkouts';
import FormExercise from './components/FormExercise';
import FormMetrics from './components/FormMetrics';
// import IndividualManga from './components/DetailsExercise';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import DetailsMetrics from './components/DetailsMetrics';
import NavComp from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link, Route, Redirect } from 'react-router-dom';

import UserService from './services/UserService';

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
			console.log('entra aqui')
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

	getTheUser = (userObj) => {
		this.setState({
			loggedInUser: userObj
		});
	};

	getProfilePublicId = (id) => {
		this.setState({
			publicProfileId: id
		});
	};
	changeAvatar = (avatarUrl) => {
		const copyUser = { ...this.state.loggedInUser, imgPath: avatarUrl };
		this.setState({
			loggedInUser: copyUser
		});
	};
	changeUserInfo = (userInfo) => {
		const copyUser = { ...this.state.loggedInUser, name: userInfo.name, lastName: userInfo.lastName };
		this.setState({ loggedInUser: copyUser });
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
				{/*<Navbar loggedInUser={this.state.loggedInUser} logOut={this.logOut}/>*/}

				<Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} logOut={this.logOut} />} />
				<Route exact path="/all-exercises" render={() => <DetailsWorkouts loggedInUser={this.state.loggedInUser} />} />
				<Route exact path="/details-metrics" render={() => <DetailsMetrics loggedInUser={this.state.loggedInUser} />} />
				<Route path="/create-exercise" render={()=> <FormExercise loggedInUser={this.state.loggedInUser} />} />
				<Route path="/add-new-metrics" render={()=> <FormMetrics loggedInUser={this.state.loggedInUser} />} />
				{/*<Route
					path="/all-exercises/:id"
					render={(props) => {
						return <IndividualManga {...props} loggedInUser={this.state.loggedInUser} />;
					}}
				/>*/}
				<Route
					path="/signup"
					render={() =>
						!this.state.loggedInUser ? (
							<SignUp
								submitSignUp={this.submitSignUp}
								newUser={this.state.newUser}
								changeHandlerSignUp={this.changeHandlerSignUp}
								getUser={this.getTheUser}
							/>
						) : (
							<Redirect to="/" />
						)}
				/>
				
				<Route
					path="/login"
					render={() =>
						!this.state.loggedInUser ? <LogIn getUser={this.getTheUser} /> : <Redirect to="/" />}
				/>
				{this.state.loggedInUser && (
					<Route path="/user-profile" render={() => <UserProfile loggedInUser={this.state.loggedInUser} />} />
				)}
			</div>
		);
	}
}

export default App;

