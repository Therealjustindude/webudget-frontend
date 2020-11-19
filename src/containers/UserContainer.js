import React, { Component } from 'react'
import ExpensesContainer from './ExpensesContainer'
import {connect} from 'react-redux'
class UserContainer extends Component {
	
	render() {
		return (
			<ExpensesContainer />
		)
	}
}

const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user,
		expenses: state.userReducer.userProfile.expenses,
		loading: state.userReducer.userProfile.loading
	}
}
export default connect(mSTP)(UserContainer)