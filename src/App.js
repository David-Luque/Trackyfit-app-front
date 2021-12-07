import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthState from './context/auth/authState';
import ExerciseState from './context/exercises/exerciseState'; 
import ResultState from './context/results/resultsState';
import MetricState from './context/metrics/metricsState';
import MeasureState from './context/measures/measureState'; 
import WorkoutState from './context/workouts/workoutState'; 
import AlertState from './context/alerts/alertState'; 

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
import UpdateWorkout from './components/workouts_components/UpdateWorkout';

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
					<ProtectedRoute exact path="/profile" component={UserProfile} />
					
					<ProtectedRoute exact path="/all-exercises" component={AllExercises} />
					<ProtectedRoute exact path="/details-exercise" component={DetailsExercise} />
					<ProtectedRoute exact path="/create-exercise" component={CreateExercise} />
					<ProtectedRoute exact path="/form-results" component={FormExerciseResults} />

					<ProtectedRoute exact path="/all-workouts" component={AllWorkouts} />
					<ProtectedRoute exact path="/create-workout" component={CreateWorkout} />
					<ProtectedRoute exact path="/details-workout" component={DetailsWorkout} />
					<ProtectedRoute exact path="/update-workout" component={UpdateWorkout} />

					<ProtectedRoute exact path="/all-metrics" component={AllMetrics} />
					<ProtectedRoute exact path="/create-metric" component={CreateMetrics} />
					<ProtectedRoute exact path="/details-metric" component={DetailsMetric} />
					<ProtectedRoute exact path="/update-metric" component={UpdateMetrics} />
					<ProtectedRoute exact path="/add-measure" component={FormMetricMeasure} />
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

