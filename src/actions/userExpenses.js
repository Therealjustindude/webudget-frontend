export const addExpense = (expenseData, browserHistory) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		expenseData.user_id = JSON.parse(localStorage.currentUser).id
		return fetch('http://localhost:3001/api/v1/users/:id/expenses', {
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
					browserHistory.push(`/users/${res.user_id}/expenses/add`)
					alert("Something went wrong!")
				} else {
					dispatch({ type: "EXPENSE_ADDED", payload: res })
					browserHistory.push(`/users/${res.user_id}`)
				}
			})
			.then(res => console.log(res))
	})
}