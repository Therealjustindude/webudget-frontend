import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import {
	BrowserRouter as Router,
	Route,
	Switch
  } from 'react-router-dom';
class UserContainer extends Component {
	
	render() {
		return (
			<div className="UserContainer">
				<Router>
					<Switch>
						<Route exact path="/" component={LoginForm} />
						<Route path='/signup' component={SignupForm} />
					</Switch>
				</Router>
			</div>
		)
	}
}
export default UserContainer