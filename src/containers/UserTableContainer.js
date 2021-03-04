import ExpensesTable from '../components/expense/ExpensesTable'
// import DebtTable from '../components/debt/DebtTable'

export const UserTableContainer = (currentUser) => {
		return (
			<>
				<ExpensesTable currentUser={currentUser.currentUser.id} userExpenses={currentUser.currentUser.expenses}  />
				{/* <DebtTable currentUser={currentUser.currentUser.id} userDebts={currentUser.currentUser.debts} /> */}
			</>
		)
}
