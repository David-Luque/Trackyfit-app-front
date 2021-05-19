import React from 'react';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import DetailsWorkouts from './components/DetailsWorkouts';
import FormExercise from './components/FormExercise';
import FormMetrics from './components/FormMetrics';
import LogIn from './components/Auth/LogIn';
import UserProfile from './components/UserProfile';
import DetailsMetrics from './components/DetailsMetrics';
import NavComp from './components/Navbar';
import { Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProtectedRoute from './components/Auth/ProtectedRoute';


class App extends React.Component {
	
	state = {
		loggedInUser: null,
		//publicProfileId: null
	};

	service = new UserService();

	fetchUser() {
		if (this.state.loggedInUser === null) {
			this.service.loggedIn()
			.then((response) => {
				this.setState({ loggedInUser: response });
			})
			.catch((err) => {
				console.log(err)
				this.setState({ loggedInUser: false });
			});
		}
	}

	getTheUser = (userInfo) => {
		this.setState({ loggedInUser: userInfo })
	};

	// getProfilePublicId = (id) => {
	// 	this.setState({
	// 		publicProfileId: id
	// 	});
	// };

	// logOut = ()=>{
	// 	this.service.logout()
	// 	.then(()=>{
	// 	  this.setState({loggedInUser: null})
	// 	})
	// 	.catch(err => console.log(err))
	//   }

	
	render() {

		this.fetchUser()
		
		if(this.state.loggedInUser){
			return (
				<div className="App">
					<NavComp userInSession={this.state.loggedInUser}/>
					<Switch>
						<ProtectedRoute user={this.state.loggedInUser} exact path="/profile" component={UserProfile} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-workout" component={DetailsWorkouts} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-metrics" component={DetailsMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-exercise" component={FormExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/add-new-metrics" component={FormMetrics} />	
					</Switch>
					
				</div>
			);
		} else {
			return (
				<div className="App">
					<NavComp userInSession={this.state.loggedInUser}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" render={()=> <SignUp getTheUser={this.getTheUser} />} />
						<Route exact path="/login" render={()=> <LogIn getTheUser={this.getTheUser} />} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/profile" component={UserProfile} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-workout" component={DetailsWorkouts} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-metrics" component={DetailsMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-exercise" component={FormExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/add-new-metrics" component={FormMetrics} />
					</Switch>
				</div>
			)
		}
		
	}
}

export default App;

