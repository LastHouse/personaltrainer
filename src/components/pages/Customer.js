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
    flexGrow: 1,
    textAlign: 'center'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary
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

  //   if (data.content.activity != null) {}

  const deleteWorkout = link => {
    fetch(link, { method: 'DELETE' })
      .then(response => fetchCustomersWorkouts())
      .catch(err => console.error(err));
  };

  const workoutColumns = [
    {
      Header: 'Activity',
      accessor: 'activity',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    {
      Header: 'Date',
      accessor: 'date',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },

      Cell: date => (
        <div>
          <Moment format="DD/MM/YYYY  HH:mm">{date.value}</Moment>
        </div>
      )
    },
    {
      Header: 'Duration (min)',
      accessor: 'duration',
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
    <div className={classes.root}>
      <h4>
        {' '}
        {'These are '}
        {props.location.props.customer.row.original.firstname}{' '}
        {props.location.props.customer.row.original.lastname}
        {"'s workouts"}
      </h4>
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
