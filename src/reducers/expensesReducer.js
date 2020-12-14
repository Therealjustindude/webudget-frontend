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
				currentUser: action.payload,
				loading: false
			}
		case "EXPENSE_PATCHED":
			return {
				...state,
				currentUser: action.payload,
				loading: false
			}
		default:
			return state
	}
 }

 export default expensesReducer