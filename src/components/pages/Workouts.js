import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchAllWorkouts(), []);

  // FETCH ALL WORKOUTS WITH CUSTOMER DATA

  const fetchAllWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setWorkouts(data));
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
    }
  ];

  return (
    <div>
      <ReactTable
        minRows={10}
        filterable={true}
        data={workouts}
        columns={columns}
      />
    </div>
  );
}
