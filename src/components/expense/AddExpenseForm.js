import React from 'react'
import { connect } from 'react-redux'
import { addExpense } from '../../actions/userExpenses'
import { Link } from 'react-router-dom';
import {
	AddExpenseFormWrapper,
	StyledForm,
	StyledH1,
	SwitchDiv,
	StyledButton
} from '../../styledComponents/addExpenseStyles'
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class AddExpenseForm extends React.Component {
	state = {
		date_due: '',
		description: '',
		amount: '',
		bank_account: '',
		is_automatic: false,
		is_paid: false,
		user_debts: [],
		debt_sel: {}
	}
	componentDidMount() {
		const user = JSON.parse(localStorage.currentUser)
		this.setState({
			...this.state,
			user_debts: user.debts ? user.debts : []
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.addExpense(this.state, this.props.history)
		this.setState({
			date_due: '',
			description: '',
			amount: '',
			bank_account: '',
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
		<>
			<AddExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
					<StyledH1>-Add Expense-</StyledH1>
						<br/>
					<TextField style={{margin: "5px"}} name="date_due" type="date" value={this.state.date_due} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} color="black" label="Description" name="description" defaultValue={this.state.description} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} name="amount" label="Amount" type="number" onChange={this.handleInput}/>	
						<br/>
					<TextField style={{margin: "5px"}} label="Account" onChange={this.handleInput} name="bank_account" defaultValue={this.state.bank_account} />
						<br />
					<SwitchDiv>
						Automatic?
						no
						
						<Switch checked={this.state.is_automatic} name="is_automatic" onChange={this.handleSwitch} value={this.state.is_automatic ? true : false}/>
						yes
						
					</SwitchDiv>
						<br />
						<h4>Does this expense belong to debt?</h4>
					<Select
						style={{margin: "5px", width:"auto", borderRadius:"10px" }}	
						value={this.state.debt_sel}
						name="debt_sel"	
						onChange={this.handleChange}
					>
						<MenuItem value="">
							<em>Select a debt</em>
						</MenuItem>	
						{this.state.user_debts.map((debt) => (
							<MenuItem value={debt.id}>{debt.title}</MenuItem>
						))}
					</Select>
						<br/>
					<StyledButton type="submit" >Submit</StyledButton>
						<br/>
					<Link onClick={() => this.props.history.goBack()}>Cancel</Link>
					</StyledForm>
			</AddExpenseFormWrapper>
			
		</>
	)}
}
export default connect(null, {addExpense})(AddExpenseForm)