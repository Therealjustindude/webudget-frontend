 const expensesReducer = (state = {expenses: [], loading: false }, action) => {
	switch (action.type) {
		case "LOADING_EXPENSES":
			return {
				...state,
				loading: true
			}
		case "EXPENSES_LOADED":
			return {
				...state,
				expenses: action.payload,
				loading: false
			}
		default:
			return state
	}
 }

 export default expensesReducer