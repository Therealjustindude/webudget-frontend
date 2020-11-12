export const loginUser = (data) => {

	return ((dispatch) => {
		// let userData = { user: data }
		dispatch({ type: "LOADING_USER" })
		return fetch('http://localhost:3001/api/v1/authenticate',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(res => { 
				// save token to local storage
				localStorage.setItem('authToken', res.auth_token)
				
				dispatch({ type: "USER_LOADED", payload: res.user })
			})
	})
}