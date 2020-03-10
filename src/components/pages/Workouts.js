import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}));

export default function Workouts() {
  const classes = useStyles();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => fetchAllWorkouts(), []);

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
      id: 'customer',
      Header: 'Customer',
      accessor: customer =>
        customer.customer.firstname + ' ' + customer.customer.lastname
    }
  ];

  return (
    <div className={classes.root}>
      <ReactTable
        minRows={10}
        filterable={true}
        data={workouts}
        columns={columns}
      />
    </div>
  );
}
