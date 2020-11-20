import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'
import {
	Link
  } from 'react-router-dom';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: ''
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.loginUser(this.state, this.props.history)
		this.setState({
			email: '',
			password: ''
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}
	render() {
		return (
			<LoginFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>-Log In-</StyledH1>
					<StyledP>Email:</StyledP>
					<StyledInput type="email" onChange={this.handleInput} name="email" value={this.state.email}/>
					<StyledP>Password:</StyledP>
					<StyledInput type="password" onChange={this.handleInput} name="password" value={this.state.password} />
					<StyledButton type="submit">Submit</StyledButton>
					<br/>
					<Link to='/signup'>No account? Click to create an account</Link>
				</StyledForm>
			</LoginFormWrapper>
	)}
}
export default connect(null, { loginUser } )(LoginForm)


const LoginFormWrapper = styled.div`
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


