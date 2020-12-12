import React from 'react'

export const PageNotfound = () => {
	return (
		<div>
			<h1 style={{color: 'red'}}>404 error Page not found.</h1>
			<button>{this.props.history.goback()}</button>
		</div>
	)
}
