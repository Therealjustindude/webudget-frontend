// export const getExpenses = (user_id) => {
// 	return ((dispatch) => {
// 		return fetch(`http://localhost:3001/api/v1/users/${user_id}/expenses`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accept": "application/json",
// 				"method": "USER_DEBT_POST",
// 				"Authorization": `${localStorage.authToken}`
// 			}
// 		})
// 			.then(res => res.json())
// 			.then(res => {
// 				if (res.error) {
// 					alert("Something went wrong!")
// 				} else {
// 					debugger
// 					dispatch({ type: "EXPENSES_FETCHED", payload: res })
// 				}
// 			})
// 	})
// }

export const addExpense = (expenseData, browserHistory) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		debugger
		expenseData.user_id = JSON.parse(localStorage.currentUser).id
		const exp = { expense: expenseData }

		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_POST",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(exp)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					browserHistory.push(`/users/${expenseData.user_id}`)
					alert("Something went wrong!")
				} else {
					debugger
					dispatch({ type: "EXPENSE_ADDED", payload: res })
					browserHistory.push(`/users/${expenseData.user_id}`)
				}
			})
	})
}

export const editExpense = (expenseData, browserHistory) => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		const exp = { expense: expenseData }
		debugger
		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses/${expenseData.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_PATCH",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(exp)
		})
			.then(res => res.json())
			.then(res => {
				debugger
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
	return (() => {
		const exp = { expense: expenseData }
		return fetch(`http://localhost:3001/api/v1/users/${expenseData.user_id}/expenses/${expenseData.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_EXPENSE_DELETE",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(exp)
		})
	})
}