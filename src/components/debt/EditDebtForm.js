import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { editDebt } from '../../actions/userDebts'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';




class EditDebtForm extends React.Component {
	state = {
		title: '',
		total: 0,
		is_paid: false,
		expenses: [],
		id: 0,
		user_id: 0
	}
	componentDidMount() {
		const debtId = parseInt(this.props.history.location.aboutProp.debt_id)
		const currentUserDebts = JSON.parse(localStorage.currentUser).debts
		const debt = currentUserDebts.find(obj => obj.id === debtId)
		this.setState({
			title: debt.title,
			total: debt.total,
			is_paid: debt.is_paid ? true : false,
			expenses: debt.expenses,
			id: debt.id,
			user_id: debt.user_id
		})	
	}
	handleSubmit = (e) => {
		e.preventDefault()
		
		this.props.editDebt(this.state, this.props.history)
		this.setState({
			title: '',
			total: 0,
			is_paid: false,
			expenses: [],
			id: 0,
			user_id: 0
		})
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	handleSwitch = (e) => {
		let bool = e.target.value.toLowerCase() === 'true' ? true : false 
			this.setState({ [e.target.name]: !bool })
	}
	render() {
		return (
		<>
			<EditDebtFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
					<StyledH1>-Edit Debt-</StyledH1>
						<br/>
					<TextField style={{margin: "5px"}} name="title" label="Account" type="text" value={this.state.title} onChange={this.handleInput}/>
						<br/>
					<TextField style={{margin: "5px"}} name="total" value={this.state.total}  label="Balance" type="number" onChange={this.handleInput}/>	
						<br />
					<SwitchDiv>
						Paid Off?
						no
						<Switch checked={this.state.is_paid} name="is_paid" onChange={this.handleSwitch} value={this.state.is_paid ? true : false}/>
						yes
					</SwitchDiv>
						<br/>
					<StyledButton type="submit" >Submit</StyledButton>
						<br/>
					<Link onClick={() => this.props.history.goBack()}>Cancel</Link>
					</StyledForm>
			</EditDebtFormWrapper>
			
		</>
	)}
}
export default connect(null, {editDebt})(EditDebtForm)


const EditDebtFormWrapper = styled.div`
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


