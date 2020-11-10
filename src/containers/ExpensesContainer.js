import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExpenses } from '../actions/expenses'

class ExpensesContainer extends Component {
	// componentDidMount() {
	// 	console.log("I mounted")
	// 	this.props.getExpenses()
	// }

	render() {
		return (
			<div>
				
			</div>
		)
	}
}
export default connect(null, { getExpenses })(ExpensesContainer)