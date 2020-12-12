import React from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'
import { removeAuth } from '../actions/localStorage'

export const Header = () => {

	const handleLogOut = () => {
		removeAuth()
	}

	return (
		<Paper style={paperStyle}>
			<Styledh1>weBudget</Styledh1>
			<StyledP>{new Date().toDateString()}</StyledP>
			<Button onClick={handleLogOut} variant="outlined" style={buttonStyle} href="/">
				Log Out
			</Button>
		</Paper>
	)
}

const paperStyle = {
	overflow: 'hidden',
	alignItems: 'center',
	padding: '5px',
	margin: '5px',
	display: 'flex',
	justifyContent: 'space-between',
	top: "0"
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