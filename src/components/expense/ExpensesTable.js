import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { deleteExpense } from '../../actions/userExpenses'
import {Link} from 'react-router-dom';

// import CheckIcon from '@material-ui/icons/Check';
import {  loadState, saveState } from '../../actions/localStorage'
import { Expense } from './Expense'

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
				<StyledDiv>
					<StyledH1>Expenses</StyledH1>
					<StyledButton>
						<Link to={`/users/${this.state.user_id}/expenses/add`}>
						Add
						</Link>
					</StyledButton>
				</StyledDiv>
				<Expense props={[...expensesArray]}/>
			</StyledDivContainer>
		  );
	}
}



const StyledDivContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2px;
`
const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin: 2px;
`


const StyledH1 = styled.h1`
 	text-align: center;
`
const StyledButton = styled.button`
	padding: 2px;
	margin: 4px;
	width: auto;
	font-size: xx-small;
	background-color: white;
`

const mSTP = (state) => {
	return {
		currentUser: state.expensesReducer.currentUser
	}
}


export default connect(mSTP, {deleteExpense})(ExpensesTable)
