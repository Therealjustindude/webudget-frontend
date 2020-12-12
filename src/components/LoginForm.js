import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'
import { Link } from 'react-router-dom';
import {
	LoginFormWrapper,
	StyledForm,
	StyledH1,
	StyledH3,
	StyledP,
	StyledInput,
	StyledButton
} from '../styledComponents/loginStyles'

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
				<StyledH1>weBudget</StyledH1>
				<StyledH3>-Log In-</StyledH3>
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