import React, { Component } from 'react'
import {
  Switch, Route
} from 'react-router-dom';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import UserContainer from './containers/UserContainer';
import './index.css';



class App extends Component {
  

  render() {
    return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={(routerProps) => <LoginForm history={routerProps.history}/>} />
					  <Route path='/signup' render={(routerProps) => <SignupForm history={routerProps.history}/>}/>
            <Route path='/users/:id' render={(routerProps) => <UserContainer history={routerProps.history} />} />
            
          </Switch>
        </div>
    ); 
  }
}

export default App;
