import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteWorkout from '../actions/DeleteWorkout';
import IconButton from '@material-ui/core/IconButton';

import Moment from 'react-moment';
import 'moment-timezone';

export default function Workouts() {
  //const [customers, setCustomers] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setWorkouts(data));
  };

  console.log(workouts);

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
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: 'Date',
      accessor: 'date',

      Cell: date => (
        <div>
          <Moment format="DD/MM/YYYY  HH:mm">{date.value}</Moment>
        </div>
      )
    },
    {
      Header: 'Duration (min)',
      accessor: 'duration'
    },
    {
      Header: 'Customer',
      accessor: 'customer.firstname'
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
      accessor: '',
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
