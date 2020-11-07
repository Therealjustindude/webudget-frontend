import { combineReducers } from 'redux'
import expenseReducer from './expensesReducer'

const rootReducer = combineReducers({
	expenseReducer
})

export default rootReducer;