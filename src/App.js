import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/authState';
import AuthContext from './context/auth/authContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
	
	//const [loggedInUser, setLoggedInUser] = useState(null);

	const authContext = useContext(AuthContext);
	const { user, loggedIn } = authContext;


	loggedIn();
	
	if(user){
		return (
			<AuthState>
				<div className="App">
					<NavComp userInSession={user}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<ProtectedRoute user={user} exact path="/profile" component={UserProfile} />

						<ProtectedRoute user={user} exact path="/all-exercises" component={AllExercises} />
						<ProtectedRoute user={user} exact path="/details-exercise/:id" component={DetailsExercise} />
						<ProtectedRoute user={user} exact path="/create-exercise" component={CreateExercise} />
						<ProtectedRoute user={user} exact path="/form-results" component={FormExerciseResults} />

						<ProtectedRoute user={user} exact path="/workouts" component={AllWorkouts} />
						<ProtectedRoute user={user} exact path="/create-workout" component={CreateWorkout} />
						<ProtectedRoute user={user} exact path="/workouts/:id" component={DetailsWorkout} />
						<ProtectedRoute user={user} exact path="/update-workout" component={UpdateWorkout} />

						<ProtectedRoute user={user} exact path="/all-metrics" component={AllMetrics} />
						<ProtectedRoute user={user} exact path="/create-metric" component={CreateMetrics} />
						<ProtectedRoute user={user} exact path="/details-metric/:id" component={DetailsMetric} />
						<ProtectedRoute user={user} exact path="/update-metric" component={UpdateMetrics} />
						<ProtectedRoute user={user} exact path="/add-measure" component={FormMetricMeasure} />
					</Switch>
				</div>
			</AuthState>
		);
	} else {
		return (
			<AuthState>
				<div className="App">
					<NavComp userInSession={user}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" render={()=> <SignUp />} />
						<Route exact path="/login" render={()=> <LogIn />} />
						<ProtectedRoute user={user} exact path="/profile" component={UserProfile} />
						
						<ProtectedRoute user={user} exact path="/all-exercises" component={AllExercises} />
						<ProtectedRoute user={user} exact path="/details-exercise" component={DetailsExercise} />
						<ProtectedRoute user={user} exact path="/create-exercise" component={CreateExercise} />
						<ProtectedRoute user={user} exact path="/form-results" component={FormExerciseResults} />

						<ProtectedRoute  user={user} exact path="/all-workouts" component={AllWorkouts} />
						<ProtectedRoute user={user} exact path="/create-workout" component={CreateWorkout} />
						<ProtectedRoute user={user} exact path="/details-workout" component={DetailsWorkout} />
						<ProtectedRoute user={user} exact path="/update-workout" component={UpdateWorkout} />

						<ProtectedRoute user={user} exact path="/all-metrics" component={AllMetrics} />
						<ProtectedRoute user={user} exact path="/create-metric" component={CreateMetrics} />
						<ProtectedRoute user={user} exact path="/details-metric" component={DetailsMetric} />
						<ProtectedRoute user={user} exact path="/update-metric" component={UpdateMetrics} />
						<ProtectedRoute user={user} exact path="/add-measure" component={FormMetricMeasure} />
					</Switch>
				</div>
			</AuthState>
		)
	}
}

export default App;

