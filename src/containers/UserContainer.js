import React, { Component } from 'react'
import {removeAuth} from '../actions/localStorage'
import Button from '@material-ui/core/Button';
import ExpensesTable from '../components/ExpensesTable'
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'


class UserContainer extends Component {
	handleLogOut = () => {
		removeAuth()
	}
	// add: expenses form to be used for create and update
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
				<ExpensesTable history={this.props.history }/>
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

export default UserContainer