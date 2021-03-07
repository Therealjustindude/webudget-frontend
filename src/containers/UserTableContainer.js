import ExpensesTable from '../components/expense/ExpensesTable'
import DebtsTable from '../components/debt/DebtsTable'

export const UserTableContainer = (currentUser) => {
		return (
			<>
				<ExpensesTable currentUser={currentUser.currentUser.id} userExpenses={currentUser.currentUser.expenses}  />
				<DebtsTable currentUser={currentUser.currentUser.id} userDebts={currentUser.currentUser.debts} />
			</>
		)
}
