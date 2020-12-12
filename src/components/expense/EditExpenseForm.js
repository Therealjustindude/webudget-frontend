import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editExpense } from '../../actions/userExpenses'
import { Link } from 'react-router-dom';
import {
	EditExpenseFormWrapper,
	SwitchDiv,
	StyledForm,
	StyledH1,
	StyledP,
	StyledButton
} from '../../styledComponents/editExpenseStyles'
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';




class EditExpenseForm extends Component {
	state = {
		date_due: '',
		description: '',
		amount: 0,
		bank_account: '',
		is_automatic: false,
		is_paid: false,
		id: 0,
		user_id: 0,
		debt_id: 0,
		user_debts: [],
		debt_sel: {}
	}

	componentDidMount() {
		const expId = parseInt(this.props.history.location.aboutProp.exp_id)
		const currentUser = JSON.parse(localStorage.currentUser)
		const exp = currentUser.expenses.find(obj => obj.id === expId)
		this.setState({
			date_due: exp.date_due,
			description: exp.description,
			amount: exp.amount,
			bank_account: exp.bank_account,
			is_automatic: exp.is_automatic ? true : false,
			is_paid: exp.is_paid ? true : false,
			id: exp.id,
			user_id: exp.user_id,
			debt_id: exp.debt_id,
			user_debts: exp.debt_id ? [] : currentUser.debts
		})
		
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.editExpense(this.state, this.props.history)
		this.setState({
			date_due: '',
			description: '',
			amount: 0,
			bank_account: '',
			is_automatic: false,
			is_paid: false,
			id: 0,
			user_id: 0,
			user_debts: [],
			debt_sel: {}
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSwitch = (e) => {
		let bool = e.target.value.toLowerCase() === 'true' ? true : false 
			this.setState({ [e.target.name]: !bool })
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value})
	}

	render() {
		return (
			<EditExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Edit Expense-</StyledH1>
					<StyledP>Date due:</StyledP>
						<br/>
					<TextField style={{margin: "5px"}} name="date_due" type="date" value={this.state.date_due} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} color="black" label="Description" name="description" value={this.state.description} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} name="amount" label="Amount" value={this.state.amount}type="number" onChange={this.handleInput}/>	
						<br/>
					<TextField style={{margin: "5px"}} label="Account" value={this.state.bank_account} onChange={this.handleInput} name="bank_account" defaultValue={this.state.bank_account} />
						<br/>
					<SwitchDiv>
						Paid?
						no
						<Switch checked={this.state.is_paid} name="is_paid" onChange={this.handleSwitch} value={this.state.is_paid ? true : false} />	
						yes
						
					</SwitchDiv>
					<SwitchDiv>
						Automatic?
						no
						
						<Switch checked={this.state.is_automatic} name="is_automatic" onChange={this.handleSwitch} value={this.state.is_automatic ? true : false}/>
						yes
						
					</SwitchDiv>
					<h4>Does this expense belong to debt?</h4>
					<Select
						style={{margin: "5px", width:"auto", borderRadius:"10px" }}	
						value={this.state.debt_sel}
						name="debt_sel"	
						onChange={this.handleChange}
					>
						<MenuItem value="">
							<em>{this.state.user_debts === [] ? 'Select a debt' : 'already linked'}</em>
						</MenuItem>	
						{this.state.user_debts.map((debt) => (
							<MenuItem value={debt.id}>{debt.title}</MenuItem>
						))}
					</Select>
					<br/>
					<StyledButton type="submit">Submit</StyledButton>
					<br/>
					<Link onClick={() => this.props.history.goBack()}>Cancel</Link>
				</StyledForm>
			</EditExpenseFormWrapper>
	)}
}
export default connect(null, {editExpense})(EditExpenseForm)