import React, { Component } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom';
// import ExpensesContainer from './containers/ExpensesContainer'
import UserContainer from './containers/UserContainer';
import './index.css';



class App extends Component {
  

  render() {
    return (
      <Router>
        <div className="App">
          <UserContainer />
          {/* <ExpensesContainer /> */}
        </div>
      </Router>
    ); 
  }
}

export default App;
