import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'


class LoginForm extends React.Component {
	state = {
		email: '',
		password: ''
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.loginUser(this.state)
		this.setState({
			email: '',
			password: ''
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}
	render(){
		return (
			<LoginFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledTitle>Log In</StyledTitle>
					<label style={lableStyle} htmlFor="email">Email:</label>
					<StyledInput type="email" onChange={this.handleInput} name="email" value={this.state.email}/>
					<label style={lableStyle} htmlFor="password">Password:</label>
					<StyledInput type="password" onChange={this.handleInput} name="password" value={this.state.password} />
					<StyledButton type="submit">Log In</StyledButton>
				</StyledForm>
			</LoginFormWrapper>
	)}
}
export default connect(null, { loginUser } )(LoginForm)

const lableStyle = {
	display: 'flex',
	margin: 5,
	textAlign: 'center',
	alignItems: 'center',
}

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
`

const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const StyledInput = styled.input`
	display: flex;
	margin: 5px;
`

const StyledButton = styled.button`
	margin: 5px;
`

// const StyledError = styled.div`

// `


