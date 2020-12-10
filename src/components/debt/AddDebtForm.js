import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addDebt } from '../../actions/userDebts'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
// import Switch from '@material-ui/core/Switch';




class AddDebtForm extends React.Component {
	state = {
		title: '',
		total: '',
		is_paid: false
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.addDebt(this.state, this.props.history)
		this.setState({
			title: '',
			total: '',
			is_paid: false
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	render() {
		return (
		<>
			<AddDebtFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
					<StyledH1>-Add Debt-</StyledH1>
						<br/>
					<TextField style={{margin: "5px"}} name="title" label="Account" type="text" value={this.state.title} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} name="total" label="Balance" type="number" onChange={this.handleInput}/>
						<br/>
					<StyledButton type="submit" >Submit</StyledButton>
						<br/>
					<Link onClick={() => this.props.history.goBack()}>Cancel</Link>
					</StyledForm>
			</AddDebtFormWrapper>
			
		</>
	)}
}
export default connect(null, {addDebt})(AddDebtForm)


const AddDebtFormWrapper = styled.div`
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

// const SwitchDiv = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items:center;
// 	margin: 8px;
// 	boxing-size: border-box;
// `

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


