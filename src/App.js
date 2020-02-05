import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: '#d3d3d3',
            color: 'black',
            textAlign: 'right',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h5">Do You Like to Train?</Typography>
        </Toolbar>
      </AppBar>
      <CustomerList />
    </div>
  );
}

export default App;
