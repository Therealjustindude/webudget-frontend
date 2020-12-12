const userReducer = (state = { userProfile: { user: {}},loading: false }, action ) => {
	switch (action.type) {
		case "LOADING_USER":
			return {
				...state,
				loading: true
			}
		case "USER_LOADED":
			return {
				...state,
				userProfile: {
					user: action.payload,
					...state.userProfile.user,
					expenses: action.payload.expenses ? action.payload.expenses : [],
					debts: action.payload.debts ? action.payload.debts : []
				},
				loading: false
			}
		case "CREATE_USER":
			return {
				...state,
				userProfile: {
					user: action.payload,
					...state.userProfile.user,
					expenses: action.payload.expenses ? action.payload.expenses : [],
					debts: action.payload.debts ? action.payload.debts : []
				},
				loading: false
			}
		default:
			return state
	}
 }

 export default userReducer