 const expensesReducer = (state = {loading: false }, action) => {
	switch (action.type) {
		case "LOADING_EXPENSES":
			return {
				...state,
				loading: true
			}
		case "EXPENSE_ADDED":
			return {
				...state,
				expense: action.payload
			}
		case "EXPENSE_PATCHED":
			return {
				...state,
				expense: action.payload
			}
		default:
			return state
	}
 }

 export default expensesReducer