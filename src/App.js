import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import Workouts from './components/pages/Workouts';
import Customer from './components/pages/Customer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Customers" component={Customers} />
          <Route path="/Workouts" component={Workouts} />
          <Route path="/Customer" component={Customer} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
