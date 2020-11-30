const debtsReducer = (state = {}, action) => {
	switch (action.type) {
		case "DEBTS_FETCHED":
			debugger
			return {
				...state,
				debts: action.payload
			}
		case "DEBT_ADDED":
			return {
				...state,
				debts: action.payload
			}
		case "DEBT_PATCHED":
			return {
				...state,
				debts: action.payload
			}
		default:
			return state
	}
 }

 export default debtsReducer