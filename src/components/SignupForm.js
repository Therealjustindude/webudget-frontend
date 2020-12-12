import React from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../actions/user'
import { Link } from 'react-router-dom';
import {
	SignupFormWrapper,
	StyledForm,
	StyledH1,
	StyledH3,
	StyledP,
	StyledInput,
	StyledButton
} from '../styledComponents/signupStyles'


class SignupForm extends React.Component {
	state = {
		user_name: '',
		email: '',
		password: ''
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.signupUser(this.state, this.props.history)
		this.setState({
			user_name: '',
			email: '',
			password: ''
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state) )
	}
	render(){
		return (
			<SignupFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
				<StyledH1>weBudget</StyledH1>
				<StyledH3>-Sign Up-</StyledH3>
					<StyledP>User Name:</StyledP>
					<StyledInput type="text" onChange={this.handleInput}name="user_name" value={this.state.user_name}/>
					<StyledP>Email:</StyledP>
					<StyledInput type="email" onChange={this.handleInput} name="email" value={this.state.email}/>
					<StyledP>Password:</StyledP>
					<StyledInput type="password" onChange={this.handleInput} name="password" value={this.state.password} />
					<StyledButton type="submit">Submit</StyledButton>
					<br/>
					<Link to='/'>Have an account? Click to log in</Link>
				</StyledForm>
			</SignupFormWrapper>
	)}
}
export default connect(null, { signupUser })(SignupForm)