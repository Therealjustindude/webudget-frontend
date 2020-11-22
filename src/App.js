import React, { Component } from 'react'
import { Suspense, lazy } from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom';
import './index.css';

const LoginForm = lazy(() => import('./components/LoginForm'));
const SignupForm = lazy(() => import('./components/SignupForm'));
const UserContainer = lazy(() => import('./containers/UserContainer'));

class App extends Component {
  
  // add componenet did mount to check for user and authtoken
  render() {

    return (
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path="/" render={(routerProps) => <LoginForm history={routerProps.history}/>} />
            <Route path='/signup' render={(routerProps) => <SignupForm history={routerProps.history} />} />
            <Route path='/users/:id' render={(routerProps) => <UserContainer history={routerProps.history} />} />
          </Switch>
        </Suspense>
      </div>
    ); 
  }
}

 

// connect to store
export default connect()(App);
