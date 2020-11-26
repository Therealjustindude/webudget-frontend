export const addExpense = (expenseData, browserHistory) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		expenseData.user_id = JSON.parse(localStorage.currentUser).id
		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_POST",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(expenseData)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					browserHistory.push(`/users/${expenseData.user_id}`)
					alert("Something went wrong!")
				} else {
					dispatch({ type: "EXPENSE_ADDED", payload: res })
					browserHistory.push(`/users/${expenseData.user_id}`)
				}
			})
	})
}

export const editExpense = (expenseData, browserHistory) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses/${expenseData.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_PATCH",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(expenseData)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					browserHistory.push(`/users/${expenseData.user_id}`)
					alert("Something went wrong!")
				} else {
					dispatch({ type: "EXPENSE_PATCHED", payload: res })
					browserHistory.push(`/users/${expenseData.user_id}`)
				}
			})
	})
}

export const deleteExpense = (expenseData) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses/${expenseData.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_DELETE",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(expenseData)
		})
	})
}