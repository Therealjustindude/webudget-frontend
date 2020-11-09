export const getExpenses = () => {
	return (dispatch) => {
		dispatch({ type: "LOADING_EXPENSES" })
		return fetch('http://localhost:3000/api/v1/expenses')
			.then(res => res.json())
			.then(expenses => dispatch({ type: "EXPENSES_LOADED", payload: expenses }))
			.then(expenses => console.log(expenses))
	}
}