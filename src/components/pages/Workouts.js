import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import DeleteWorkout from '../actions/DeleteWorkout';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchAllWorkouts(), []);

  // FETCH ALL WORKOUTS WITH CUSTOMER DATA

  const fetchAllWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setWorkouts(data));
  };

  // DELETE WON'T WORK FROM THIS ENDPOINT

  const deleteWorkout = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchAllWorkouts())
      .catch(err => console.error(err));
  };

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
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'workouts.id',
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
