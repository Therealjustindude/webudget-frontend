import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

class EditExpenseForm extends React.Component {
	state = {
		date_due: '',
		description: '',
		amount: '',
		bank_account: '',
		is_automatic: ''
	}
	handleSubmit = (e) => {
		e.preventDefault()
		// this.props.loginUser(this.state, this.props.history)
		this.setState({
			date_due: '',
			description: '',
			amount: '',
			bank_account: '',
			is_automatic: '',
			paid: '',
			id: '',
			user_id: ''
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}
	render() {
		return (
			<EditExpenseFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Add Expense-</StyledH1>
					<StyledP>Description:</StyledP>
					<StyledInput type="hidden" onChange={this.handleInput} name="id" value={this.state.id}/>
					<StyledInput type="hidden" onChange={this.handleInput} name="user_id" value={this.state.user_id}/>
					<StyledInput type="text" onChange={this.handleInput} name="description" value={this.state.description}/>
					<StyledP>Date due:</StyledP>
					<StyledInput type="date" onChange={this.handleInput} name="date_due" value={this.state.password} />
					<StyledP>Amount:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="amount" value={this.state.password} />
					<StyledP>Account:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="bank_account" value={this.state.bank_account} />
					<StyledP>Paid?:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="paid" value={this.state.paid} />
					<StyledP>Automatic?:</StyledP>
					<StyledInput type="text" onChange={this.handleInput} name="is_automatic" value={this.state.is_automatic} />
					<StyledButton type="submit">Submit</StyledButton>
				</StyledForm>
			</EditExpenseFormWrapper>
	)}
}
export default connect()(EditExpenseForm)


const EditExpenseFormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;
	height: 100vh;
	padding: 0 20px;
	boxing-size: border-box;
	background-color: black;
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


