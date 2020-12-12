import React from 'react'
// import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'

export const Footer = () => {

	return (
		<div style={divStyle}>
			<StyledP>weBudget <em>by Justin Dev-ies</em></StyledP>	
		</div>
	)
}

const divStyle = {
	position: 'fixed',
	border: 'none',
	overflow: 'hidden',
	padding: '5px',
	bottom: '0',
	width: 'auto'
}

const StyledP = styled.p`
  font-size: 0.2em;
  padding: 5px;
  margin: 5px;
`;