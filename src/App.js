import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import CustomersMT from './components/pages/CustomersMT';
import Workouts from './components/pages/Workouts';
import Customer from './components/pages/Customer';
import MyCalendar from './components/pages/MyCalendar';
import Statistics from './components/pages/Statistics';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Customers" component={Customers} />
          <Route path="/CustomersMT" component={CustomersMT} />
          <Route path="/Workouts" component={Workouts} />
          <Route path="/Customer" component={Customer} />
          <Route path="/Calendar" component={MyCalendar} />
          <Route path="/Statistics" component={Statistics} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
