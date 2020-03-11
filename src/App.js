import React from 'react';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import Workouts from './components/pages/Workouts';
import MyCalendar from './components/pages/MyCalendar';
import Statistics from './components/pages/Statistics';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Customers" component={Customers} />
          <Route path="/Workouts" component={Workouts} />
          <Route path="/Calendar" component={MyCalendar} />
          <Route path="/Statistics" component={Statistics} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
