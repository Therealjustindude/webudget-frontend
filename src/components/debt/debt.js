import React, {useState} from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

export const Debt = (debts) => {
	const [open, setOpen] = useState(false);
	
	return (	
		debts.props.map(debt => (
			<Paper style={paperStyle(debt)} onClick={() => setOpen(!open)}>
		 	<StyledDiv>
				<StyledDivAttr>{debt.title}</StyledDivAttr>
				<StyledDivAttr>${debt.total}</StyledDivAttr>
			</StyledDiv>
			<DropDownDiv isOpen={open}>
				<StyledLiAttr>Paid: {debt.is_paid ? 'True' : 'False'}</StyledLiAttr>
				<StyledButton>
					<Link to={{
					pathname: `/users/${debt.user_id}/debtenses/${debt.id}/edit`,
					aboutProp: {
						debt_id: `${debt.id}`
						}
					}}>
					Edit
					</Link>
				</StyledButton>
			</DropDownDiv>
			</Paper>
			
		))
	)

	
}

const paperStyle = (debt) => {
	return {
		overflow: 'hidden',
		alignItems: 'center',
		padding: '10px',
		marginBottom: '6px',
		justifyContent: 'space-between',
		width: '300px',
		cursor: 'pointer',
		borderBottom: `${debt.is_paid ? 'solid green' : 'solid red'}`,
		borderTop: `${debt.is_paid ? 'solid green' : 'solid red'}`,
	}
}

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: auto auto;
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

const StyledButton = styled.button`
	padding: 2px;
	width: auto;
	font-size: xx-small;
`