import React, { Component } from 'react'
import{loadState, saveState} from '../actions/localStorage'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const useStyles = {
  table: {
    minWidth: 650,
  },
};


class ExpensesTable extends Component {
	state = {
		user: {},
		expenses: []
	}
	// use component will unmount to update the db and save data to local storage
	componentDidMount() {
		if (localStorage.getItem("currentUser") === null) {
			saveState(this.props.user)
		} else {
			const currentUser = JSON.parse(localStorage.currentUser)
			debugger
			if (this.props.newExpense){
				currentUser.expenses.push(this.props.newExpense)
			}
			localStorage.removeItem('currentUser')
			saveState(currentUser)
		}
		const persistedState = { user: loadState() }
		this.setState({
			user: persistedState.user,
			expenses: persistedState.user.expenses ? persistedState.user.expenses : []
		})		
	}
	// add expenses button
	render() {
		const rows = this.state.expenses;
		return (
			<>
				<TableContainer component={Paper}>
					  <Table className={useStyles.table}>
						<TableHead>
							  <TableRow>
								<TableCell>Paid</TableCell>
								<TableCell align="right">Due Date</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Amount</TableCell>
								<TableCell align="right">Withdrawn Account</TableCell>
								<TableCell align="right">Automatic Payment</TableCell>
								<TableCell align="right">Money Deposited</TableCell>
							  </TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id} user_id={row.user_id}>
									  <TableCell ><Checkbox /></TableCell>
									  <TableCell align="right">{row.date_due}</TableCell>
									  <TableCell align="right">{row.description}</TableCell>
									  <TableCell align="right">{row.amount}</TableCell>
									  <TableCell align="right">{row.bank_account}</TableCell>
									  <TableCell align="right">{row.is_automatic ? "Yes" : "No"}</TableCell>
									<TableCell align="right"><Checkbox /></TableCell>
									{/* style check boxes and add a function to change data in db */}
									{/* can i hide the id and user_id in the table cell */}
								</TableRow>
							  ))}
						</TableBody>
					  </Table>
				</TableContainer>
			</>
		  );
	}
}

const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user ,
		expenses: state.userReducer.userProfile.expenses,
		newExpense: state.expensesReducer.userProfile.expenses
	}
}

export default connect(mSTP)(ExpensesTable)
