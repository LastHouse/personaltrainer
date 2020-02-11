import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import DeleteCustomer from './DeleteCustomer';
// import EditCustomer from './EditCustomer';
import DeleteWorkout from './actions/DeleteWorkout';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';

export default function Workouts() {
  const [customers, setCustomers] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const deleteWorkout = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchData())
      .catch(err => console.error(err));
  };

  /* const updateWorkout = (customer, link) => {
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

  const saveWorkout = workout => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    })
      .then(response => fetchData())
      .catch(err => console.error(err));
  };

  */

  const columns = [
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      Cell: row => (
        <IconButton workout={row.original}>
          <AddBox />
        </IconButton>
      )
    },
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Duration (min)',
      accessor: 'duration'
    },
    {
      Header: 'Customer',
      accessor: 'firstname + lastname'
    },
    {
      Header: 'Steet address',
      accessor: 'streetaddress'
    },

    /* {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,

      Cell: row => (
        <EditWorkOut updateWorkout={updateWorkout} workout={row.original} />
      )
    },

    */
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'links[2].href',
      Cell: row => (
        <div>
          <DeleteWorkout deleteWorkout={deleteWorkout} workout={row.original} />
        </div>
      )
    }
  ];

  return (
    <div>
      <ReactTable filterable={true} data={workouts} columns={columns} />
    </div>
  );
}
