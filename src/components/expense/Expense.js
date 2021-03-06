import React, {useState} from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';

export const Expense = (expenses) => {
	console.log(expenses)
	const [open, setOpen] = useState(false);
	
	return (	
		expenses.props.map(exp => (
			<Paper style={paperStyle(exp)} onClick={() => setOpen(!open)}>
		 	<StyledDiv>
				<StyledDivAttr>{new Intl.DateTimeFormat('en-US').format(new Date(exp.date_due))}</StyledDivAttr>
				<StyledDivAttr>{exp.description}</StyledDivAttr>
				<StyledDivAttr>${exp.amount}</StyledDivAttr>
			</StyledDiv>
			<DropDownDiv isOpen={open}>
				<StyledLiAttr>Paid: {exp.is_paid ? 'True' : 'False'}</StyledLiAttr>
				<StyledLiAttr>{exp.bank_account === "" ? "Account: N/A": `Account: ${exp.bank_account.toUpperCase()}`}</StyledLiAttr>
				<StyledLiAttr>Automatic: {exp.is_automatic ? 'True' : 'False'}</StyledLiAttr>
					
			</DropDownDiv>
			</Paper>
			
		))
	)

	
}

const paperStyle = (exp) => {
	return {
		overflow: 'hidden',
		alignItems: 'center',
		padding: '10px',
		marginBottom: '6px',
		justifyContent: 'space-between',
		width: '300px',
		cursor: 'pointer',
		borderBottom: `${exp.is_paid ? 'solid green' : 'solid red'}`,
		borderTop: `${exp.is_paid ? 'solid green' : 'solid red'}`,
	}
}

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: auto auto auto;
	justify-content: space-between;
`
const StyledDivAttr = styled.div`
	padding: 2px;
`
const StyledLiAttr = styled.li`
	margin: 3px;
`

const DropDownDiv = styled.div`
	display: ${props => props.isOpen ? 'flex' : 'none'};
	margin: 5px;
	border-top: double grey;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`