const userReducer = (state = { user: {}, loading: false }, action ) => {
	switch (action.type) {
		case "LOADING_USER":
			return {
				...state,
				loading: true
			}
		case "USER_LOADED":
			return {
				...state,
				user: action.payload,
				loading: false
			}
		default:
			return state
	}
 }

 export default userReducer