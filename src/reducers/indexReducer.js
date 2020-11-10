import { combineReducers } from 'redux'
import expensesReducer from './expensesReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
	expensesReducer,
	userReducer
})

export default rootReducer;