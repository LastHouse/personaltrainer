import React, { useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import DeleteWorkout from '../actions/DeleteWorkout';

export default function Customer(props) {
  const [workouts, setWorkouts] = useState([]);

  console.log(props);

  /*
  const showCustomerWorkouts = () => {
    setWorkouts({
      activity: props.customer.activity,
      date: props.customer.date,
      duration: props.customer.duration,
      customer: props.customer
    });
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
    {
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'workouts.id',
      Cell: row => (
        <div>
          <DeleteWorkout workout={row.original} />
        </div>
      )
    }
  ];

  return (
    <div>
      <ReactTable filterable={false} data={workouts} columns={columns} />
    </div>
  );
}
