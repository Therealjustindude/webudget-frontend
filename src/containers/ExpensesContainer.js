import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getExpenses } from '../actions/expenses'

class ExpensesContainer extends Component {
	
	render() {
		return (
			<div>
				hi
			</div>
		)
	}
}
export default connect(null, { getExpenses })(ExpensesContainer)