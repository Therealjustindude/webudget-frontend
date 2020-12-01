import React, { Component } from 'react'
import ExpensesTable from '../components/ExpensesTable'
import DebtTable from '../components/DebtTable'

export default class UserTableContainer extends Component {
	render() {
		return (
			<>
				<ExpensesTable currentUser={this.props.currentUser.id} userExpenses={this.props.currentUser.expenses} history={this.props.history} />
				<DebtTable currentUser={this.props.currentUser.id} userDebts={this.props.currentUser.debts} history={this.props.history}/>
			</>
		)
	}
}
