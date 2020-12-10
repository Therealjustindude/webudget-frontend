import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addExpense } from '../../actions/userExpenses'
import { Link } from 'react-router-dom';
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
						<MenuItem disabled value="">
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


const AddExpenseFormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;
	height: auto;
	width: auto;
	padding: 0 20px;
	boxing-size: border-box;
`

const StyledForm = styled.form`
	width: 100%;
	max-width: 700px;
	padding: 40px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
	text-align: center;
	position: fixed;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`

const StyledH1 = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin: 10px;
`;

const SwitchDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;
	margin: 8px;
	boxing-size: border-box;
`

// const StyledP = styled.p`
//   font-size: 1.5em;
//   text-align: center;
//   font-size: medium;
// `;



const StyledButton = styled.button`
	margin: 8px;
	padding: 3px;
	width: 80px;
`

// const StyledError = styled.div`

// `


