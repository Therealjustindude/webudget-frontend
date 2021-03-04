import React, { Component } from 'react'
import { Suspense, lazy } from 'react';
import {Switch, Route} from 'react-router-dom';
import './index.css';


const LoginForm = lazy(() => import('./components/LoginForm'));
const SignupForm = lazy(() => import('./components/SignupForm'));
const UserContainer = lazy(() => import('./containers/UserContainer'));
const AddExpenseForm = lazy(() => import('./components/expense/AddExpenseForm'));
const EditExpenseForm = lazy(() => import('./components/expense/EditExpenseForm'));
const AddDebtForm = lazy(() => import('./components/debt/AddDebtForm'));
const EditDebtForm = lazy(() => import('./components/debt/EditDebtForm'));

class App extends Component {
    render() {
    return (
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path="/" render={(routerProps) => <LoginForm history={routerProps.history}/>} />
            <Route exact path='/signup' render={(routerProps) => <SignupForm history={routerProps.history} />} />
            <Route exact path='/users/:id' render={(routerProps) => <UserContainer history={routerProps.history} />} />
            <Route exact path='/users/:id/expenses/add' render={(routerProps) => <AddExpenseForm history={routerProps.history} />} /> 
            <Route exact path='/users/:user_id/expenses/:id/edit' render={(routerProps) => <EditExpenseForm history={routerProps.history} />} />
            <Route exact path='/users/:id/debts/add' render={(routerProps) => <AddDebtForm history={routerProps.history} />} /> 
            <Route exact path='/users/:user_id/debts/:id/edit' render={(routerProps) => <EditDebtForm history={routerProps.history} />} /> 
          </Switch>
        </Suspense>
      </div>
    ); 
  }
}


export default App;
