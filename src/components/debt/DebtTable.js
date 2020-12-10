import React, { Component } from 'react'
import {deleteDebt } from '../../actions/userDebts'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {  loadState, saveState } from '../../actions/localStorage'


class DebtTable extends Component {
	state = {
		user_id: 0,
		debts: this.props.userDebts ? this.props.userDebts : [],
		sortConfig: null
	}

	componentDidMount() {
		if (localStorage.getItem("currentUser")) {
			const currentUser = JSON.parse(localStorage.currentUser)
			if (this.props.debts) {
				delete currentUser.debts
				currentUser.debts = this.props.debts
				localStorage.removeItem('currentUser')
				this.setState({
					...this.state,
					debts: this.props.debts ? this.props.debts : currentUser.debts,
					user_id: currentUser.id,
				})
				saveState(currentUser)
			} else {
				const persistedState = { user: loadState() }
				this.setState({
				debts: persistedState.user.debts,
				user_id: persistedState.user.id
				}) 
			}
		} 
		
	}


	getTotal = (debts) => {
		if (debts) {
			let total = 0
			debts.forEach(debt => {
				total += debt.total
			})
			return total
		} else {
			return 0
		}
	}

	handleDelete = (dbt) => {
		this.props.deleteDebt(dbt)
		const currentUser = JSON.parse(localStorage.currentUser)
        const removeIndex = currentUser.debts.map(debt => debt.id).indexOf(dbt.id)
        currentUser.debts.splice(removeIndex, 1)
        localStorage.removeItem('currentUser')
        saveState(currentUser)
        const persistedState = { user: loadState() }
        this.setState({
         user_id: persistedState.user.id,
         debts: persistedState.user.debts 
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
		let sortedDebts = this.state.debts ? this.state.debts : []
		if (this.state.sortConfig !== null) {
			sortedDebts.sort((a, b) => {
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
							<TableCell align="center">
								<StyledButton>
									<Link to={`/users/${this.state.user_id}/debts/add`}>
									Add Debt
									</Link>
								</StyledButton>
							</TableCell>
							<TableCell align="center">   </TableCell>	
							<TableCell align="center">
								<button style={{ border: "none", background: "none" }} onClick={this.requestSort} name="title">Account</button>
							</TableCell>
							<TableCell align="center">
									<button style={{ border: "none", background: "none" }} onClick={this.requestSort} name="total">Balance</button>
							</TableCell>
							<TableCell align="center">
									<button style={{ border: "none", background: "none" }} onClick={this.requestSort} name="is_paid">Paid Off</button>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedDebts.map((debt) => (
							<TableRow key={debt.id} user_id={debt.user_id}>
								<TableCell align="center">
									<StyledButton onClick={() => this.handleDelete(debt)}>
										Delete
									</StyledButton>
								</TableCell>
								<TableCell align="center">
									<StyledButton>
										<Link to={{
										pathname: `/users/${debt.user_id}/debts/${debt.id}/edit`,
										aboutProp: {
											debt_id: `${debt.id}`
											}
										}}>
										Edit
										</Link>
									</StyledButton>
								</TableCell>
								<TableCell align="center">
									{debt.title}
								</TableCell>
								<TableCell align="center">$
									{new Intl.NumberFormat().format(debt.total)}
								</TableCell>
								<TableCell align="center" padding="checkbox">
									<FormControlLabel
										control={<Checkbox icon={<CheckIcon color='disabled'/>} checkedIcon={<CheckIcon htmlColor='lightseagreen' />} name="is_paid" />}
										checked={debt.is_paid ? true : false}
									/>	
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell /> 
							<TableCell /> 
							<TableCell /> 
							<TableCell variant="footer" align="center">
									Total: ${new Intl.NumberFormat().format(this.getTotal(this.state.debts))}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</Paper>
			</>
		)
	}
}

const StyledButton = styled.button`
	padding: 2px;
	width: auto;
	font-size: xx-small;
`

const mSTP = (state) => {
	return {
		debts: state.debtsReducer.debts
	}
}

export default connect(mSTP, {deleteDebt})(DebtTable)