import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editExpense } from '../actions/userExpenses'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';




class EditExpenseForm extends Component {
	state = {
		date_due: '',
		description: '',
		amount: 0,
		bank_account: '',
		is_automatic: false,
		is_paid: false,
		id: 0,
		user_id: 0
	}

	componentDidMount() {
		const expId = parseInt(this.props.history.location.aboutProp.exp_id)
		const currentUserExpenses = JSON.parse(localStorage.currentUser).expenses
		const exp = currentUserExpenses.find(obj => obj.id === expId)
		this.setState({
			date_due: exp.date_due,
			description: exp.description,
			amount: exp.amount,
			bank_account: exp.bank_account,
			is_automatic: exp.is_automatic ? true : false,
			is_paid: exp.is_paid ? true : false,
			id: exp.id,
			user_id: exp.user_id
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
			user_id: 0
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}

	handleSwitch = (e) => {
		let bool = e.target.value.toLowerCase() === 'true' ? true : false 
			this.setState({ [e.target.name]: !bool }, () => console.log(this.state) )
	}
	

	render() {
		return (
			<EditExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Edit Expense-</StyledH1>
					<TextField style={{margin: "5px"}} name="id" type="hidden" value={this.state.id} onChange={this.handleInput}/>
					<TextField style={{margin: "5px"}} name="user_id" type="hidden" value={this.state.user_id} onChange={this.handleInput}/>
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
					<StyledButton type="submit">Submit</StyledButton>
					<br/>
					<Link onClick={() => this.props.history.goBack()}>Cancel</Link>
				</StyledForm>
			</EditExpenseFormWrapper>
	)}
}
export default connect(null, {editExpense})(EditExpenseForm)


const EditExpenseFormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;
	height: 100vh;
	padding: 0 20px;
	boxing-size: border-box;
	background-color: black;
`
const SwitchDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;
	margin: 8px;
	boxing-size: border-box;
`

const StyledForm = styled.form`
	width: 100%;
	max-width: 700px;
	padding: 40px;
	background-color: white;
	border-radius: 10px;
	boxing-size: border-box;
	box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
	text-align: center;
`

const StyledH1 = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin: 10px;
`;
const StyledP = styled.p`
  font-size: 1.5em;
  text-align: center;
  font-size: medium;
`;



const StyledButton = styled.button`
	margin: 8px;
	padding: 3px;
	width: 80px;
`




