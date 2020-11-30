 const expensesReducer = (state = {loading: false }, action) => {
	switch (action.type) {
		case "LOADING_EXPENSES":
			return {
				...state,
				loading: true
			}
		case "EXPENSES_FETCHED":
			return {
				...state,
				expenses: action.payload
			}
		case "EXPENSE_ADDED":
			return {
				...state,
				expenses: action.payload
			}
		case "EXPENSE_PATCHED":
			return {
				...state,
				expenses: action.payload
			}
		default:
			return state
	}
 }

 export default expensesReducer