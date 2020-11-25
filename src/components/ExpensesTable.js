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
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import { deleteExpense } from '../actions/userExpenses'




const useStyles = {
  table: {
    minWidth: 650,
  },
};


class ExpensesTable extends Component {
	state = {
		user: this.props.user ? this.props.user : {},
		expenses: this.props.expenses ? this.props.expenses : []
	}
	// use component will unmount to update the db and save data to local storage
	componentDidMount() {
		if (localStorage.getItem("currentUser") === null) {
			saveState(this.props.user)
		} else {
			const currentUser = JSON.parse(localStorage.currentUser)
			if (this.props.expense && currentUser.expenses.find(exp => exp.id === this.props.expense.id)) { 
				const removeIndex = currentUser.expenses.map(exp => exp.id).indexOf(this.props.expense.id)
				currentUser.expenses.splice(removeIndex, 1)
				currentUser.expenses.push(this.props.expense)
				localStorage.removeItem('currentUser')
				saveState(currentUser)
			} else if (this.props.expense) {
				currentUser.expenses.push(this.props.expense)
				localStorage.removeItem('currentUser')
				saveState(currentUser)
			}
		}
		const persistedState = { user: loadState() }
		this.setState({
			user: persistedState.user,
			expenses: persistedState.user.expenses ? persistedState.user.expenses : []
		})		
	}


	handleDelete = (exp) => {
		this.props.deleteExpense(exp)
		const currentUser = JSON.parse(localStorage.currentUser)
		const removeIndex = currentUser.expenses.map(expense => expense.id).indexOf(exp.id)
		currentUser.expenses.splice(removeIndex, 1)
		localStorage.removeItem('currentUser')
		saveState(currentUser)
		const persistedState = { user: loadState() }
		this.setState({
			user: persistedState.user,
			expenses: persistedState.user.expenses ? persistedState.user.expenses : []
		})
	}


	render() {
		return (
			<>
				<TableContainer component={Paper} >
					  <Table className={useStyles.table}>
						<TableHead>
							  <TableRow >
								<TableCell align="center">Paid</TableCell>
								<TableCell align="center">Due Date</TableCell>
								<TableCell align="center">Description</TableCell>
								<TableCell align="center">Amount</TableCell>
								<TableCell align="center">Withdrawn Account</TableCell>
								<TableCell align="center">Automatic Payment</TableCell>
								<TableCell align="center">Money Deposited</TableCell>
								<TableCell align="center"> </TableCell>
								<TableCell align="center"> </TableCell>
							  </TableRow>
						</TableHead>
						<TableBody>
							{this.state.expenses.map((exp) => (
								<TableRow key={exp.id} user_id={exp.user_id}>
									  <TableCell align="center" padding="checkbox" ><Checkbox checked={exp.is_paid ? true : false} /></TableCell>
									  <TableCell align="center">{exp.date_due}</TableCell>
									  <TableCell align="center">{exp.description}</TableCell>
									  <TableCell align="center">{exp.amount}</TableCell>
									  <TableCell align="center">{exp.bank_account}</TableCell>
									  <TableCell align="center">{exp.is_automatic ? "Yes" : "No"}</TableCell>
									<TableCell align="center" padding="checkbox"><Checkbox checked={exp.is_money_in_account ? true : false}/></TableCell>
									<TableCell align="center">
										<Link to={{
											pathname: `/users/${exp.user_id}/expenses/${exp.id}/edit`,
											aboutProp: {
												exp_id: `${exp.id}`
											}
										}}>
											<StyledButton>Edit</StyledButton>
										</Link>
									</TableCell>
									<TableCell align="center">
											<StyledButton onClick={()=> this.handleDelete(exp)}>Delete</StyledButton>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell variant="footer" size="small" align="center">
									<Link to={`/users/${this.state.user.id}/expenses/add`}>
										<StyledButton>Add Expense</StyledButton>
									</Link>
								</TableCell>
							</TableRow>
						</TableBody>
					  </Table>
				</TableContainer>
			</>
		  );
	}
}


const StyledButton = styled.button`
	padding: 2px;
	width: auto;
	font-size: xx-small;
`

const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user ,
		expenses: state.userReducer.userProfile.expenses,
		expense: state.expensesReducer.expense
	}
}

export default connect(mSTP, {deleteExpense})(ExpensesTable)
