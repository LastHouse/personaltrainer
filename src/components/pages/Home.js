import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteCustomer from '../actions/DeleteCustomer';
import EditCustomer from '../actions/EditCustomer';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';

export default function Home() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const deleteCustomer = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchData())
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
      .then(response => fetchData())
      .catch(err => console.error(err));
  };

  const saveWorkout = customer => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(response => fetchData())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      Cell: row => (
        <IconButton customer={row.original}>
          <AddBox />
        </IconButton>
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
