import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

class UserContainer extends Component {
	
	render() {
		return (
			<div className="UserContainer">
				<LoginForm />
			</div>
		)
	}
}
export default UserContainer