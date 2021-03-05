import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
// import {Link} from 'react-router-dom';
import { deleteExpense } from '../../actions/userExpenses'
// import CheckIcon from '@material-ui/icons/Check';
import {  loadState, saveState } from '../../actions/localStorage'

class ExpensesTable extends Component {
	state = {
		user_id: 0,
		expenses: this.props.userExpenses ? this.props.userExpenses : [],
		sortConfig: {
			key: 'date_due',
			direction: 'ascending'
		}
	}

	componentDidMount() {
		if (localStorage.getItem("currentUser")) {
			if (this.props.currentUser) { 
				const currentLsUser = JSON.parse(localStorage.currentUser)
				delete currentLsUser.expenses
				delete currentLsUser.debts
				localStorage.removeItem('currentUser')
				currentLsUser.expenses = this.props.currentUser.expenses
				currentLsUser.debts = this.props.currentUser.debts
				this.setState({
					...this.state,
					expenses: this.props.currentUser.expenses ? this.props.currentUser.expenses : currentLsUser.expenses,
					user_id: currentLsUser.id,
				})
				saveState(currentLsUser)
			} else {
				const prevState = { user: loadState() }
				this.setState({
				expenses: prevState.user.expenses,
				user_id: prevState.user.id
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
		let expensesArray = this.state.expenses ? this.state.expenses : []
		console.log(expensesArray)
		if (this.state.sortConfig !== null) {
			expensesArray.sort((a, b) => {
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
			<StyledDivContainer>
				<StyledH1>Expenses</StyledH1>
				{expensesArray.map((exp) => (
					<Paper style={paperStyle}>
						<StyledDivAttr>{new Intl.DateTimeFormat('en-US').format(new Date(exp.date_due))}</StyledDivAttr>
						<StyledDivAttr>{exp.description}</StyledDivAttr>
						<StyledDivAttr>${exp.amount}</StyledDivAttr>
					</Paper>
				))}
			</StyledDivContainer>
		  );
	}
}

const paperStyle = {
	overflow: 'hidden',
	alignItems: 'center',
	padding: '5px',
	margin: '5px',
	display: 'flex',
	justifyContent: 'space-between',
	width: '300px'
}

const StyledDivContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2px;
	padding: 2px;
`
const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	border-style: solid;
	border-color: black;
	margin: 2px;
	padding: 2px;
	width: 500px;
`

const StyledDivAttr = styled.div`
	margin: 10px
`
const StyledH1 = styled.h1`
 	text-align: center;
`
// const StyledButton = styled.button`
// 	padding: 2px;
// 	width: auto;
// 	font-size: xx-small;
// `

const mSTP = (state) => {
	return {
		currentUser: state.expensesReducer.currentUser
	}
}


export default connect(mSTP, {deleteExpense})(ExpensesTable)
