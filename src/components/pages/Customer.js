import React, { useState, useEffect } from 'react';
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

export default function Customer(props) {
  const [workouts, setWorkouts] = useState([]);
  const classes = useStyles();

  useEffect(() => fetchCustomersWorkouts(), []);

  const fetchCustomersWorkouts = () => {
    fetch(props.location.props.customer.row.original.links[2].href)
      .then(response => response.json())
      .then(data => setWorkouts(data.content));
  };

  //console.log(workouts);

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
    }
    /*
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
    */
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
