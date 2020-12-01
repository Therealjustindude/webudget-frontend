import React, { Component } from 'react'
import { removeAuth } from '../actions/localStorage'
import Button from '@material-ui/core/Button';
import ExpensesTable from '../components/ExpensesTable'
import DebtTable from '../components/DebtTable'
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'
import { connect } from 'react-redux'
import {  saveState } from '../actions/localStorage'



class UserContainer extends Component {
	state ={
		user: this.props.user ? this.props.user : {}
	}

	handleLogOut = () => {
		removeAuth()
	}

	componentDidMount() {
		if (localStorage.getItem("currentUser") === null) {
			saveState(this.props.user)
		}
	}
	
	render() {
		return (
			<>
				<Paper style={{overflow:'hidden', alignItems: 'center', padding:'5px', margin:'5px', display: 'flex',justifyContent: 'space-between' }}>
					<Styledh1>weBudget</Styledh1>
					<StyledP>{new Date().toDateString()}</StyledP>
					<Button onClick={this.handleLogOut} variant="outlined" style={buttonStyle} href="/">
  						Log Out
					</Button>
				</Paper>
				<ExpensesTable currentUser={this.state.user.id} userExpenses={this.state.user.expenses} history={this.props.history} />
				<DebtTable currentUser={this.state.user.id} userDebts={this.state.user.debts} history={this.props.history}/>
			</>
		)
	}
}

const buttonStyle = {
	display: "flex",
	float: "right",
	margin: "10px"
}
const Styledh1 = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  float: left;
  margin: 5px;
`;
const StyledP = styled.span`
  font-size: 0.9em;
`;

const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user
	}
}

export default connect(mSTP)(UserContainer)