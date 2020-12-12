import React from 'react'
import { connect } from 'react-redux'
import { addDebt } from '../../actions/userDebts'
import { Link } from 'react-router-dom';
import {
	AddDebtFormWrapper,
	StyledForm,
	StyledH1,
	StyledButton
} from '../../styledComponents/addDebtStyles'
import TextField from '@material-ui/core/TextField';




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