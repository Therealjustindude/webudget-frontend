export const loginUser = (data, browserHistory) => {
	return ((dispatch) => {
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
				if (res.errors) {
					browserHistory.push('/')
				} else {
					localStorage.setItem('authToken', res.auth_token)
					dispatch({ type: "USER_LOADED", payload: res.user })
					browserHistory.push(`/users/${res.user.id}`)
				}
				
			})
	})
}

export const signupUser = (data, browserHistory) => {
	return ((dispatch) => {
		let userData = { user: data }
		dispatch({ type: "LOADING_USER" })
		return fetch('http://localhost:3001/api/v1/users',{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_POST"
			},
			body: JSON.stringify(userData)
		})
			.then(res => res.json())
			.then(res => { 
				if (res.errors) {
					browserHistory.push('/')
				} else {
					localStorage.setItem('authToken', res.auth_token)
					dispatch({ type: "CREATE_USER", payload: res.user })
					browserHistory.push(`/users/${res.user.id}`)
				}				
			})
	})
}