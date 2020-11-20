import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const useStyles = {
  table: {
    minWidth: 650,
  },
};
const StyledDiv = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  margin: 5px;
`;

class ExpensesTable extends Component {
	
	
	render() {
		const rows = this.props.user.expenses;
		return (
			<>
				<Paper><StyledDiv>weBudget</StyledDiv></Paper>
				<TableContainer component={Paper}>
					  <Table className={useStyles.table}>
						<TableHead>
							  <TableRow>
								<TableCell>Paid</TableCell>
								<TableCell align="right">Due Date</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Amount</TableCell>
								<TableCell align="right">Withdrawn Account</TableCell>
								<TableCell align="right">Automatic Payment</TableCell>
								<TableCell align="right">Money Deposited</TableCell>
							  </TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id} user_id={row.user_id}>
									  <TableCell ><Checkbox /></TableCell>
									  <TableCell align="right">{row.date_due}</TableCell>
									  <TableCell align="right">{row.description}</TableCell>
									  <TableCell align="right">{row.amount}</TableCell>
									  <TableCell align="right">{row.bank_account}</TableCell>
									  <TableCell align="right"><Checkbox /></TableCell>
									<TableCell align="right"><Checkbox /></TableCell>
									{/* style check boxes and add a function to change data in db */}
									{/* can i hide the id and user_id in the table cell */}
								</TableRow>
							  ))}
						</TableBody>
					  </Table>
				</TableContainer>
			</>
		  );
	}
}

const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user,
		expenses: state.userReducer.userProfile.expenses
	}
}

export default connect(mSTP)(ExpensesTable)
