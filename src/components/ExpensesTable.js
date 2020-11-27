import React, { Component } from 'react'
import{loadState, saveState} from '../actions/localStorage'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import { deleteExpense } from '../actions/userExpenses'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';



class ExpensesTable extends Component {
	state = {
		user: this.props.user ? this.props.user : {},
		expenses: this.props.expenses ? this.props.expenses : [],
		total: 0,
		sortConfig: null
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
			expenses: persistedState.user.expenses ? persistedState.user.expenses : [],
			total: this.getTotal(persistedState.user.expenses)
		})	
	}

	getTotal = (expenses) => {
		let total = 0
		expenses.forEach(exp => {
			total += exp.amount 
		})
		return total
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

	setSortConfig = (targetKey, targetDirection) => {
		debugger
		this.setState({
			...this.state,
			sortConfig: {
				key: targetKey,
				direction: targetDirection
			}
		})
	}
	requestSort = e => {
		let key = e.target.name
		let direction = 'ascending';
		if (this.state.sortConfig && this.state.sortConfig.key === key){
			if (this.state.sortConfig.direction === 'ascending') {
				direction = 'descending';
			}
		} else {
			this.setSortConfig(key, direction);
		}
		this.setSortConfig(key, direction);
	}

	render() {
		let sortedExpenses = this.state.expenses
		if (this.state.sortConfig !== null) {
			sortedExpenses.sort((a, b) => {
			  if (a[this.state.sortConfig.key] < b[this.state.sortConfig.key]) {
					return this.state.sortConfig.direction === 'ascending' ? -1 : 1;
			  }
			  if (a[this.state.sortConfig.key] > b[this.state.sortConfig.key]) {
				return this.state.sortConfig.direction === 'ascending' ? 1 : -1;
			  }
			  return 0;
			});
		  }
		return (
			<>
				<Paper style={{ overflow:'hidden',margin: '5px' }}>
					<Table >
					<TableHead>
							<TableRow >
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="date_due">Due Date</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="description">Description</button></TableCell>
							<TableCell align="center"><button style={{ border: "none", background: "none" }} onClick={this.requestSort} name="amount">Amount</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="is_automatic">Automatic</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="bank_account">Account</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="is_paid">Paid</button></TableCell>
							<TableCell align="center">  </TableCell>
							<TableCell align="center">
								<StyledButton>
									<Link to={`/users/${this.state.user.id}/expenses/add`}>
									Add Expense
									</Link>
								</StyledButton>
							</TableCell>
							</TableRow>
					</TableHead>
					<TableBody>
						{sortedExpenses.map((exp) => (
							<TableRow key={exp.id} user_id={exp.user_id}>
								<TableCell align="center">
									{new Intl.DateTimeFormat('en-US').format(new Date(exp.date_due))}
								</TableCell>
								<TableCell align="center">{exp.description}</TableCell>
								<TableCell align="center">
									${new Intl.NumberFormat().format(exp.amount)}
								</TableCell>
								<TableCell align="center">{exp.is_automatic ? "Yes" : "No"}</TableCell>
								<TableCell align="center">{exp.bank_account}</TableCell>
								<TableCell align="right" padding="checkbox" >
									<FormControlLabel
									control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="is_paid" />}
									checked={exp.is_paid ? true : false}
									/>	
								</TableCell>
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
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell/>
							<TableCell/>
							<TableCell /> 
							<TableCell variant="footer" align="center">
									Total: ${new Intl.NumberFormat().format(this.state.total)}
							</TableCell>
						</TableRow>
					</TableFooter>
					</Table>
				</Paper>
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
