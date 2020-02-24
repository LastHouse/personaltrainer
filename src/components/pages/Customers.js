import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomer from '../actions/AddCustomer';
import DeleteCustomer from '../actions/DeleteCustomer';
import EditCustomer from '../actions/EditCustomer';
import AddWorkout from '../actions/AddWorkout';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function Customers() {
  const [title, setTitle] = useState('Home');
  const [customers, setCustomers] = useState([]);
  const classes = useStyles();

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const deleteCustomer = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchCustomers())
      .catch(err => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(response => fetchCustomers())
      .catch(err => console.error(err));
  };

  const saveWorkout = workout => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    })
      .then(response => fetchCustomers())
      .catch(err => console.error(err));
  };

  const saveCustomer = customer => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(response => fetchCustomers())
      .catch(err => console.error(err));
  };

  const onItemClick = title => () => {
    setTitle(title);
  };

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: 'links[2].href',
      Cell: row => (
        <Tooltip title="Show Workouts">
          <IconButton
            workouts={row}
            component={Link}
            to={{
              pathname: '/Customer',
              props: { customer: { row } }
            }}
            onClick={onItemClick('Customer')}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      )
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      Cell: row => (
        <AddWorkout
          saveWorkout={saveWorkout}
          workout={row.original}
          customer={row.original}
        />
      )
    },
    {
      Header: 'First name',
      accessor: 'firstname'
    },
    {
      Header: 'Last name',
      accessor: 'lastname'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Steet address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: 'links[1].href',
      Cell: row => (
        <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
      )
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: 'links[1].href',
      Cell: row => (
        <div>
          <DeleteCustomer
            deleteCustomer={deleteCustomer}
            customer={row.original}
          />
        </div>
      )
    }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddCustomer saveCustomer={saveCustomer} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ReactTable
            minRows={10}
            filterable={true}
            data={customers}
            columns={columns}
          />
        </Grid>
      </Grid>
    </div>
  );
}
