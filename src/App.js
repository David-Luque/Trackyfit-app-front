import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserService from './services/UserService';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import NavComp from './components/Navbar';

import SignUp from './components/Auth/SignUp';
import LogIn from './components/Auth/LogIn';

import UserProfile from './components/UserProfile';

import AllExercises from './components/exercises_components/AllExercises';
import DetailsExercise from './components/exercises_components/DetailsExercise';
import CreateExercise from './components/exercises_components/CreateExercise';
import UpdateExercise from './components/exercises_components/UpdateExercise';
import FormExerciseResults from './components/exercises_components/FormExerciseResults';

import AllWorkouts from './components/workouts_components/AllWorkouts';
import CreateWorkout from './components/workouts_components/CreateWorkout';
import DetailsWorkout from './components/workouts_components/DetailsWorkout';
import UpdateWorkout from './components/workouts_components/UpdateWorkout';

import AllMetrics from './components/metrics_components/AllMetrics';
import CreateMetrics from './components/metrics_components/CreateMetrics';
import DetailsMetric from './components/metrics_components/DetailsMetrics';
import UpdateMetrics from './components/metrics_components/UpdateMetrics';
import FormMetricResults from './components/metrics_components/FormMetricResults';



class App extends React.Component {
	
	state = {
		loggedInUser: null,
	};

	userService = new UserService();

	fetchUser() {
		if (this.state.loggedInUser === null) {
			this.userService.loggedIn()
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


	render() {

		this.fetchUser()
		
		if(this.state.loggedInUser){
			return (
				<div className="App">
					<NavComp getTheUser={this.getTheUser} userInSession={this.state.loggedInUser}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/profile" component={UserProfile} />

						<ProtectedRoute user={this.state.loggedInUser} exact path="/all-exercises" component={AllExercises} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-exercise/:id" component={DetailsExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-exercise" component={CreateExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-exercise" component={UpdateExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/form-results" component={FormExerciseResults} />

						<ProtectedRoute user={this.state.loggedInUser} exact path="/workouts" component={AllWorkouts} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-workout" component={CreateWorkout} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/workouts/:id" component={DetailsWorkout} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-workout" component={UpdateWorkout} />

						<ProtectedRoute user={this.state.loggedInUser} exact path="/all-metrics" component={AllMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-metric" component={CreateMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-metric" component={DetailsMetric} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-metric" component={UpdateMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/add-metric-results" component={FormMetricResults} />
					</Switch>
					
				</div>
			);
		} else {
			return (
				<div className="App">
					<NavComp getTheUser={this.getTheUser} userInSession={this.state.loggedInUser}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" render={()=> <SignUp getTheUser={this.getTheUser} />} />
						<Route exact path="/login" render={()=> <LogIn getTheUser={this.getTheUser} />} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/profile" component={UserProfile} />
						
						<ProtectedRoute user={this.state.loggedInUser} exact path="all-exercises" component={AllExercises} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-exercise" component={DetailsExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-exercise" component={CreateExercise} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-exercise" component={UpdateExercise} />
						{/* <ProtectedRoute user={this.state.loggedInUser} exact path="/add-exercise-results" component={FormExerciseResults} /> */}

						<ProtectedRoute  user={this.state.loggedInUser} exact path="/all-workouts" component={AllWorkouts} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-workout" component={CreateWorkout} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-workout" component={DetailsWorkout} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-workout" component={UpdateWorkout} />

						<ProtectedRoute user={this.state.loggedInUser} exact path="all-metrics" component={AllMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/create-metric" component={CreateMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/details-metric" component={DetailsMetric} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/update-metric" component={UpdateMetrics} />
						<ProtectedRoute user={this.state.loggedInUser} exact path="/add-metric-results" component={FormMetricResults} />
					</Switch>
				</div>
			)
		}
		
	}
}

export default App;

