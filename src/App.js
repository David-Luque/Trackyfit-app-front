import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthState from './context/auth/authState';
import ExerciseState from './context/exercises/exerciseState'; 
import ResultState from './context/results/resultsState';
import MetricState from './context/metrics/metricsState';
import MeasureState from './context/measures/measureState'; 
import WorkoutState from './context/workouts/workoutState'; 
import AlertState from './context/alerts/alertsState';

import Home from './components/Home';
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

import AllMetrics from './components/metrics_components/AllMetrics';
import CreateMetrics from './components/metrics_components/CreateMetric';
import DetailsMetric from './components/metrics_components/DetailsMetrics';
import UpdateMetrics from './components/metrics_components/EditMetric';
import FormMetricMeasure from './components/metrics_components/FormMetricMeasure';

import authToken from './config/authToken';

const token = localStorage.getItem('token');
if(token) {
	authToken(token);
}

const App = () => {
	return (
		<AuthState>
		<ExerciseState>
		<ResultState>
		<MetricState>
		<MeasureState>
		<WorkoutState>
		<AlertState>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" render={()=> <SignUp />} />
					<Route exact path="/login" render={()=> <LogIn />} />
					<PrivateRoute exact path="/profile" component={UserProfile} />
					
					<PrivateRoute exact path="/all-exercises" component={AllExercises} />
					<PrivateRoute exact path="/details-exercise" component={DetailsExercise} />
					<PrivateRoute exact path="/create-exercise" component={CreateExercise} />
					<PrivateRoute exact path="/form-results" component={FormExerciseResults} />

					<PrivateRoute exact path="/all-workouts" component={AllWorkouts} />
					<PrivateRoute exact path="/create-workout" component={CreateWorkout} />
					<PrivateRoute exact path="/details-workout" component={DetailsWorkout} />

					<PrivateRoute exact path="/all-metrics" component={AllMetrics} />
					<PrivateRoute exact path="/create-metric" component={CreateMetrics} />
					<PrivateRoute exact path="/details-metric" component={DetailsMetric} />
					<PrivateRoute exact path="/update-metric" component={UpdateMetrics} />
					<PrivateRoute exact path="/add-measure" component={FormMetricMeasure} />
				</Switch>
		</Router>
		</AlertState>
		</WorkoutState>
		</MeasureState>
		</MetricState>
		</ResultState>
		</ExerciseState>
		</AuthState>
	);
}

export default App;

