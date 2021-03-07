import React, { Component } from 'react'
import {deleteDebt } from '../../actions/userDebts'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { loadState, saveState } from '../../actions/localStorage'
import {Debt} from './debt'


class DebtsTable extends Component {
	state = {
		user_id: 0,
		debts: this.props.userDebts ? this.props.userDebts : [],
	}

	componentDidMount() {
		if (localStorage.getItem("currentUser")) {
			const currentUser = JSON.parse(localStorage.currentUser)
			if (this.props.debts) {
				delete currentUser.debts
				currentUser.debts = this.props.debts
				localStorage.removeItem('currentUser')
				this.setState({
					...this.state,
					debts: this.props.debts ? this.props.debts : currentUser.debts,
					user_id: currentUser.id,
				})
				saveState(currentUser)
			} else {
				const persistedState = { user: loadState() }
				this.setState({
				debts: persistedState.user.debts,
				user_id: persistedState.user.id
				}) 
			}
		} 
		
	}


	getTotal = (debts) => {
		if (debts) {
			let total = 0
			debts.forEach(debt => {
				total += debt.total
			})
			return total
		} else {
			return 0
		}
	}

	handleDelete = (dbt) => {
		this.props.deleteDebt(dbt)
		const currentUser = JSON.parse(localStorage.currentUser)
        const removeIndex = currentUser.debts.map(debt => debt.id).indexOf(dbt.id)
        currentUser.debts.splice(removeIndex, 1)
        localStorage.removeItem('currentUser')
        saveState(currentUser)
        const persistedState = { user: loadState() }
        this.setState({
         user_id: persistedState.user.id,
         debts: persistedState.user.debts 
        })
	}


	render() {
		let debtsArray = this.state.debts ? this.state.debts : []
		return (
			<StyledDivContainer>
				<StyledDiv>
					<StyledH1>Debts</StyledH1>
					<StyledButton>
						<Link to={`/users/${this.state.user_id}/debts/add`}>
						Add
						</Link>
					</StyledButton>
				</StyledDiv>
				<Debt props={[...debtsArray]}/>
			</StyledDivContainer>
		)
	}
}

const StyledDivContainer = styled.div`
	display: grid;
	justify-content: center;
`
const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin: 2px;
`


const StyledH1 = styled.h1`
 	text-align: center;
`
const StyledButton = styled.button`
	padding: 2px;
	margin: 4px;
	width: auto;
	font-size: xx-small;
	background-color: white;
`

const mSTP = (state) => {
	return {
		debts: state.debtsReducer.debts
	}
}

export default connect(mSTP, {deleteDebt})(DebtsTable)