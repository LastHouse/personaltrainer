import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteCustomer from '../actions/DeleteCustomer';
import EditCustomer from '../actions/EditCustomer';
import AddWorkout from '../actions/AddWorkout';
import AddCustomer from '../actions/AddCustomer';
import CustomerWorkouts from '../actions/CustomerWorkouts';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  divider: {
    textAlign: 'left'
  }
}));

export default function Customers() {
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

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 60,
      accessor: 'links[2].href',
      Cell: row => <CustomerWorkouts customer={row.original} />
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
      accessor: 'firstname',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Last name',
      accessor: 'lastname',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Email',
      accessor: 'email',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Steet address',
      accessor: 'streetaddress',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Postcode',
      accessor: 'postcode',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'City',
      accessor: 'city',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
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
      <div className={classes.divider}>
        <AddCustomer saveCustomer={saveCustomer} />
      </div>
      <Divider />
      <ReactTable
        minRows={10}
        filterable={true}
        data={customers}
        columns={columns}
      />
    </div>
  );
}
