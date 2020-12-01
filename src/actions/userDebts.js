// export const getDebts = () => {
// 	return ((dispatch) => {
// 		let user_id = JSON.parse(localStorage.currentUser).id
// 		return fetch(`http://localhost:3001/api/v1/users/${user_id}/debts`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Accept": "application/json",
// 				"method": "USER_DEBT_GET,
// 				"Authorization": `${localStorage.authToken}`
// 			}
// 		})
// 			.then(res => res.json())
// 			.then(res => {
// 				if (res.error) {
// 					alert("Something went wrong!")
// 				} else {
// 					dispatch({ type: "DEBTS_FETCHED", payload: res })
// 				}
// 			})
// 	})
// }

export const addDebt = (debtData, browserHistory) => {
	return ((dispatch) => {
		debtData.user_id = JSON.parse(localStorage.currentUser).id
		const debt = { debt: debtData }
		return fetch(`http://localhost:3001/api/v1/users/${debtData.user_id}/debts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_DEBT_POST",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(debt)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					browserHistory.push(`/users/${debtData.user_id}`)
					alert("Something went wrong!")
				} else {
					dispatch({ type: "DEBT_ADDED", payload: res })
					browserHistory.push(`/users/${debtData.user_id}`)
				}
			})
	})
}

export const editDebt = (debtData, browserHistory) => {
	return ((dispatch) => {
		const debt = { debt: debtData }
		return fetch(`http://localhost:3001/api/v1/users/${debtData.user_id}/debts/${debtData.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_DEBT_PATCH",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(debt)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					browserHistory.push(`/users/${debtData.user_id}`)
					alert("Something went wrong!")
				} else {
					dispatch({ type: "DEBT_PATCHED", payload: res })
					browserHistory.push(`/users/${debtData.user_id}`)
				}
			})
	})
}

export const deleteDebt = (debtData) => {
	return (() => {
		return fetch(`http://localhost:3001/api/v1/users/${debtData.user_id}/debts/${debtData.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"method": "USER_DEBT_DELETE",
				"Authorization": `${localStorage.authToken}`
			},
			body: JSON.stringify(debtData)
		})
	})
}