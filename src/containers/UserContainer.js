import React, { Component } from 'react'

import { connect } from 'react-redux'
import {  saveState } from '../actions/localStorage'
import { UserTableContainer }  from './UserTableContainer';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';



class UserContainer extends Component {
	componentDidMount() {
		if (localStorage.getItem("currentUser") === null) {
			debugger
			saveState(this.props.user)
		}
	}
	render() {
		return (
			<>
				<Header />
				<UserTableContainer currentUser={this.props.user} />
				<Footer/>
			</>
		)
	}
}



const mSTP = (state) => {
	return {
		user: state.userReducer.userProfile.user
	}
}

export default connect(mSTP)(UserContainer)