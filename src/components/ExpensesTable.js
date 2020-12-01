import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {  loadState, saveState } from '../actions/localStorage'





class ExpensesTable extends Component {
	state = {
		user_id: 0,
		expenses: this.props.userExpenses ? this.props.userExpenses : [],
		sortConfig: null
	}

	componentDidMount() {
		if (localStorage.getItem("currentUser")){
			if (this.props.user_expenses) { 
				const currentUser = JSON.parse(localStorage.currentUser)
				delete currentUser.expenses
				delete currentUser.debts
				localStorage.removeItem('currentUser')
				currentUser.expenses = this.props.user_expenses.expenses
				currentUser.debts = this.props.user_expenses.debts
				this.setState({
					...this.state,
					expenses: this.props.user_expenses.expenses ? this.props.user_expenses.expenses : currentUser.expenses,
					user_id: currentUser.id,
				})
				saveState(currentUser)
			} else {
				const persistedState = { user: loadState() }
				this.setState({
				expenses: persistedState.user.expenses,
				user_id: persistedState.user.id
				}) 
			}
		} 
	}	

	getTotal = (expenses) => {
		if (expenses) {
			let total = 0
			expenses.forEach(exp => {
				total += exp.amount 
			})
			return total
		} else {
			return 0
		}
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
         user_id: persistedState.user.id,
         expenses: persistedState.user.expenses ? persistedState.user.expenses : []
        })
	}

	setSortConfig = (targetKey, targetDirection) => {
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
		let sortedExpenses = this.state.expenses ? this.state.expenses : []
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
				<Paper style={{ overflow:'hidden',margin: '5px', display: 'flex',justifyContent: 'space-between' }}>
					<Table >
					<TableHead>
							<TableRow >
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="date_due">Due Date</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="description">Description</button></TableCell>
							<TableCell align="center"><button style={{ border: "none", background: "none" }} onClick={this.requestSort} name="amount">Amount</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="is_automatic">Automatic</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="bank_account">Account</button></TableCell>
							<TableCell align="center"><button style={{border: "none", background: "none"}} onClick={this.requestSort} name="is_paid">Paid</button></TableCell>
							<TableCell align="center">          </TableCell>
							<TableCell align="center">
								<StyledButton>
									<Link to={`/users/${this.state.user_id}/expenses/add`}>
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
								<TableCell align="center" padding="checkbox">
									<FormControlLabel
										control={<Checkbox icon={<CheckIcon color='disabled'/>} checkedIcon={<CheckIcon htmlColor='lightseagreen' />} name="is_paid" />}
									checked={exp.is_paid ? true : false}
									/>	
								</TableCell>
								<TableCell align="center">
									<StyledButton>
										<Link to={{
										pathname: `/users/${exp.user_id}/expenses/${exp.id}/edit`,
										aboutProp: {
											exp_id: `${exp.id}`
											}
										}}>
										Edit
										</Link>
									</StyledButton>
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
							<TableCell />
							<TableCell variant="footer" align="center">
									Total: ${new Intl.NumberFormat().format(this.getTotal(this.state.expenses))}
							</TableCell>
							<TableCell /> 
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
		user_expenses: state.expensesReducer.expenses
	}
}


export default connect(mSTP, {deleteExpense})(ExpensesTable)
