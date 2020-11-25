import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editExpense } from '../actions/userExpenses'
import {Link} from 'react-router-dom';


class EditExpenseForm extends Component {
	state = {
		date_due: '',
		description: '',
		amount: 0,
		bank_account: '',
		is_automatic: false,
		is_paid: false,
		is_money_in_account: false,
		id: 0,
		user_id: 0
	}

	componentDidMount(){
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
			is_money_in_account: exp.is_money_in_account ? true : false,
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
			is_money_in_account: false,
			id: 0,
			user_id: 0
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}

	handleRadio = (e) => {
		this.setState({ [e.target.name]: e.target.value.toLowerCase() === 'true' ? true : false }, () => console.log(this.state) )
	}

	render() {
		return (
			<EditExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Edit Expense-</StyledH1>
					<StyledP>Description:</StyledP>
					<StyledInput type="hidden" onChange={this.handleInput} name="id" value={this.state.id}/>
					<StyledInput type="hidden" onChange={this.handleInput} name="user_id" value={this.state.user_id}/>
					<StyledInput type="text" onChange={this.handleInput} name="description" value={this.state.description}/>
					<StyledP>Date due:</StyledP>
					<StyledInput type="date" onChange={this.handleInput} name="date_due" value={this.state.date_due} />
					<StyledP>Amount:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="amount" value={this.state.amount} />
					<StyledP>Account:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="bank_account" value={this.state.bank_account} />
					<RadioDiv>
						Paid?
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_paid" value="true" checked={this.state.is_paid ? true : false}/> Yes
								
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_paid" value="false" checked={!this.state.is_paid ? true : false}/> No
					</RadioDiv>
					<RadioDiv>
						Automatic?
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_automatic" value="true" checked={this.state.is_automatic ? true : false}/> Yes
						
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_automatic" value="false" checked={!this.state.is_automatic ? true : false}/> No
					</RadioDiv>
					<RadioDiv>
						Is money in account?
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_money_in_account" value="true" checked={this.state.is_money_in_account ? true : false}/> Yes
					
						<input style={{ margin: "5px" }} type="radio" onChange={this.handleRadio} name="is_money_in_account" value="false" checked={!this.state.is_money_in_account ? true : false}/> No
					</RadioDiv>
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
const RadioDiv = styled.div`
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

const StyledInput = styled.input`
	margin: 5px;
	display: block;
  	margin-right: auto;
  	margin-left: auto;
`

const StyledButton = styled.button`
	margin: 8px;
	padding: 3px;
	width: 80px;
`

// const StyledError = styled.div`

// `


