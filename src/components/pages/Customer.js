import React, { useState, useEffect, useCallback } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import DeleteWorkout from '../actions/DeleteWorkout';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  }
}));

// TYHJÄ RESPONSE RENDERÖI PÄIVÄMÄÄRÄN JA LUO RIVIN!!!

export default function Customer(props) {
  const [workouts, setWorkouts] = useState([]);
  const classes = useStyles();

  const fetchCustomersWorkouts = useCallback(async () => {
    const response = await fetch(
      props.location.props.customer.row.original.links[2].href
    );
    const data = await response.json();
    return setWorkouts(data.content);
  }, [props.location.props.customer.row.original.links]);
  useEffect(() => {
    fetchCustomersWorkouts();
  }, [fetchCustomersWorkouts]);

  const deleteWorkout = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchCustomersWorkouts())
      .catch(err => console.error(err));
  };

  const workoutColumns = [
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
      Header: '',
      sortable: false,
      filterable: false,
      width: 50,
      accessor: 'links[1].href',
      Cell: row => (
        <div>
          <DeleteWorkout deleteWorkout={deleteWorkout} workout={row.original} />
        </div>
      )
    }
  ];

  return (
    <div>
      <div className={classes.root}>
        {'These are '}
        {props.location.props.customer.row.original.firstname}{' '}
        {props.location.props.customer.row.original.lastname}
        {"'s workouts"}
      </div>
      <Divider />
      <ReactTable
        minRows={10}
        filterable={false}
        data={workouts}
        columns={workoutColumns}
      />
    </div>
  );
}
