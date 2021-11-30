import React, { useState } from 'react';
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
import FormExerciseResults from './components/exercises_components/FormExerciseResults';

import AllWorkouts from './components/workouts_components/AllWorkouts';
import CreateWorkout from './components/workouts_components/CreateWorkout';
import DetailsWorkout from './components/workouts_components/DetailsWorkout';
import UpdateWorkout from './components/workouts_components/UpdateWorkout';

import AllMetrics from './components/metrics_components/AllMetrics';
import CreateMetrics from './components/metrics_components/CreateMetric';
import DetailsMetric from './components/metrics_components/DetailsMetrics';
import UpdateMetrics from './components/metrics_components/EditMetric';
import FormMetricMeasure from './components/metrics_components/FormMetricMeasure';



const App = () => {
	
	const [loggedInUser, setLoggedInUser] = useState(null);

	const userService = new UserService();

	const fetchUser = () => {
		if (loggedInUser === null) {
			userService.loggedIn()
			.then((response) => {
				setLoggedInUser(response);
			})
			.catch((err) => {
				console.log(err)
				setLoggedInUser(false);
			});
		}
	}

	const getTheUser = (userInfo) => {
		setLoggedInUser(userInfo)
	};


	fetchUser();
	
	if(loggedInUser){
		return (
			<div className="App">
				<NavComp getTheUser={getTheUser} userInSession={loggedInUser}/>
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute user={loggedInUser} exact path="/profile" component={UserProfile} />

					<ProtectedRoute user={loggedInUser} exact path="/all-exercises" component={AllExercises} />
					<ProtectedRoute user={loggedInUser} exact path="/details-exercise/:id" component={DetailsExercise} />
					<ProtectedRoute user={loggedInUser} exact path="/create-exercise" component={CreateExercise} />
					<ProtectedRoute user={loggedInUser} exact path="/form-results" component={FormExerciseResults} />

					<ProtectedRoute user={loggedInUser} exact path="/workouts" component={AllWorkouts} />
					<ProtectedRoute user={loggedInUser} exact path="/create-workout" component={CreateWorkout} />
					<ProtectedRoute user={loggedInUser} exact path="/workouts/:id" component={DetailsWorkout} />
					<ProtectedRoute user={loggedInUser} exact path="/update-workout" component={UpdateWorkout} />

					<ProtectedRoute user={loggedInUser} exact path="/all-metrics" component={AllMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/create-metric" component={CreateMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/details-metric/:id" component={DetailsMetric} />
					<ProtectedRoute user={loggedInUser} exact path="/update-metric" component={UpdateMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/add-measure" component={FormMetricMeasure} />
				</Switch>
			</div>
		);
	} else {
		return (
			<div className="App">
				<NavComp getTheUser={getTheUser} userInSession={loggedInUser}/>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" render={()=> <SignUp getTheUser={getTheUser} />} />
					<Route exact path="/login" render={()=> <LogIn getTheUser={getTheUser} />} />
					<ProtectedRoute user={loggedInUser} exact path="/profile" component={UserProfile} />
					
					<ProtectedRoute user={loggedInUser} exact path="/all-exercises" component={AllExercises} />
					<ProtectedRoute user={loggedInUser} exact path="/details-exercise" component={DetailsExercise} />
					<ProtectedRoute user={loggedInUser} exact path="/create-exercise" component={CreateExercise} />
					<ProtectedRoute user={loggedInUser} exact path="/form-results" component={FormExerciseResults} />

					<ProtectedRoute  user={loggedInUser} exact path="/all-workouts" component={AllWorkouts} />
					<ProtectedRoute user={loggedInUser} exact path="/create-workout" component={CreateWorkout} />
					<ProtectedRoute user={loggedInUser} exact path="/details-workout" component={DetailsWorkout} />
					<ProtectedRoute user={loggedInUser} exact path="/update-workout" component={UpdateWorkout} />

					<ProtectedRoute user={loggedInUser} exact path="/all-metrics" component={AllMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/create-metric" component={CreateMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/details-metric" component={DetailsMetric} />
					<ProtectedRoute user={loggedInUser} exact path="/update-metric" component={UpdateMetrics} />
					<ProtectedRoute user={loggedInUser} exact path="/add-measure" component={FormMetricMeasure} />
				</Switch>
			</div>
		)
	}
}

export default App;

