export const getExpenses = () => {
	return ((dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		return fetch('http://localhost:3001/api/v1/users/:id/expenses')
			.then(res => res.json())
			.then(expenses => dispatch({ type: "EXPENSES_LOADED", payload: expenses }))
			.then(expenses => console.log(expenses))
	})
}