import React, { useState, useEffect, useCallback } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment/moment.js';
import 'moment-timezone';
import DeleteWorkout from '../actions/DeleteWorkout';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';

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

export default function CustomerWorkouts(props) {
  const [open, setOpen] = React.useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content));
  };

  const fetchCustomersWorkouts = useCallback(async () => {
    const response = await fetch(props.customer.links[2].href);
    const data = await response.json();

    return setWorkouts(data.content);
  }, [props.customer.links]);
  useEffect(() => {
    fetchCustomersWorkouts();
  }, [fetchCustomersWorkouts]);

  const deleteWorkout = link => {
    fetch(link, {
      method: 'DELETE'
    })
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
      id: 'date',
      Header: 'Date',
      accessor: row =>
        row.date === null ? '' : moment(row.date).format('DD/MM/YYYY  HH:mm'),
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
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

  function Content({ list }) {
    if (!list) {
      return null;
    }
    if (list[0].activity === undefined) {
      return (
        <div className={classes.root}>
          <p>Nothing here...</p>
          <p> You better contact customer and make an appointment</p>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <ReactTable
            minRows={3}
            filterable={false}
            data={workouts}
            columns={workoutColumns}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <Tooltip title="Show Workouts">
        <IconButton onClick={() => handleClickOpen()}>
          <ArrowForwardIcon></ArrowForwardIcon>
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {' '}
          {'These are '}
          {props.customer.firstname} {props.customer.lastname}
          {"'s workouts"}
        </DialogTitle>
        <DialogContent>
          <Content list={workouts} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
