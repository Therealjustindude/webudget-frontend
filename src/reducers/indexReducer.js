import { combineReducers } from 'redux'
import expensesReducer from './expensesReducer'
import userReducer from './userReducer'
import debtsReducer from './debtsReducer'

const rootReducer = combineReducers({
	expensesReducer,
	userReducer,
	debtsReducer
})

export default rootReducer;