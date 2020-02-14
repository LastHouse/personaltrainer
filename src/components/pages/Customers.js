import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteCustomer from '../actions/DeleteCustomer';
import EditCustomer from '../actions/EditCustomer';
import AddWorkout from '../actions/AddWorkout';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

export default function Customers() {
  const [title, setTitle] = useState('Home');
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  console.log(customers);

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

  const onItemClick = title => () => {
    setTitle(title);
  };

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'links[2].href',
      Cell: row => (
        <IconButton
          customer={row.original}
          component={Link}
          to="/Customer"
          onClick={onItemClick('Customer')}
        >
          <ArrowForwardIcon />
        </IconButton>
      )
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
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
      width: 50,
      accessor: 'links[1].href',
      Cell: row => (
        <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
      )
    },
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
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
    <div>
      <ReactTable filterable={true} data={customers} columns={columns} />
    </div>
  );
}
