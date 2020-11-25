import React, { Component } from 'react'
import { Suspense, lazy } from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom';
import './index.css';

const LoginForm = lazy(() => import('./components/LoginForm'));
const SignupForm = lazy(() => import('./components/SignupForm'));
const UserContainer = lazy(() => import('./containers/UserContainer'));
const AddExpenseForm = lazy(() => import('./components/AddExpenseForm'));
const EditExpenseForm = lazy(() => import('./components/EditExpenseForm'));

class App extends Component {
  
  // add componenet did mount to check for user and authtoken
  render() {

    return (
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path="/" render={(routerProps) => <LoginForm history={routerProps.history}/>} />
            <Route exact path='/signup' render={(routerProps) => <SignupForm history={routerProps.history} />} />
            <Route exact path='/users/:id' render={(routerProps) => <UserContainer history={routerProps.history} />} />
            <Route exact path='/users/:id/expenses/add' render={(routerProps) => <AddExpenseForm history={routerProps.history} />} /> */}
            <Route exact path='/users/:user_id/expenses/:id/edit' render={(routerProps) => <EditExpenseForm history={routerProps.history} />} />
          </Switch>
        </Suspense>
      </div>
    ); 
  }
}

 

// connect to store
export default connect()(App);
