import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addExpense } from '../actions/userExpenses'
import {Link} from 'react-router-dom';



class AddExpenseForm extends React.Component {
	state = {
		date_due: '',
		description: '',
		amount: '',
		bank_account: '',
		is_automatic: false,
		is_paid: false,
		is_money_in_account: false
	}
	handleSubmit = (e) => {
		e.preventDefault()
		debugger
		this.props.addExpense(this.state, this.props.history)
		this.setState({
			date_due: '',
			description: '',
			amount: '',
			bank_account: ''
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}
	render() {
		// const currentUserId = JSON.parse(localStorage.currentUser).id
		// href={`/users/${currentUserId}`}
		return (
		<>
			<AddExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Add Expense-</StyledH1>
					<StyledP>Description:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="description" value={this.state.description}/>
					<StyledP>Date due:</StyledP>
					<StyledInput type="date" onChange={this.handleInput} name="date_due" value={this.state.password} />
					<StyledP>Amount:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="amount" value={this.state.password} />
					<StyledP>Account:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="bank_account" value={this.state.password} />
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


