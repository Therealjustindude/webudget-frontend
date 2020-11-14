import React, { Component } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
// import ExpensesContainer from './containers/ExpensesContainer'
import UserContainer from './containers/UserContainer';
import './index.css';



class App extends Component {
  

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
                <UserContainer />
            </Route>

          </Switch>
        </div>
      </Router>
    ); 
  }
}

export default App;
