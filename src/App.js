import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Workouts from './components/pages/Workouts';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Workouts" component={Workouts} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
