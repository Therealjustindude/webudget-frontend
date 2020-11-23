 const expensesReducer = (state = { userProfile: { user: {}},loading: false }, action) => {
	switch (action.type) {
		case "LOADING_EXPENSES":
			return {
				...state,
				loading: true
			}
		case "EXPENSE_ADDED":
			return {
				...state,
				userProfile: {
					...state.userProfile.user,
					expenses: action.payload
				}
			}
		default:
			return state
	}
 }

 export default expensesReducer