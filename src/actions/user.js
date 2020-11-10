export const getUser = () => {
	return (dispatch) => {
		dispatch({ type: "LOADING_USER" })
		return fetch('http://localhost:3001/api/v1/users/:id')
			.then(res => res.json())
			.then(user => dispatch({ type: "USER_LOADED", payload: user }))
			.then(user => console.log(user))
	}
}