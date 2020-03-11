import React, { useState, useEffect, useCallback } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';
import 'moment-timezone';
import DeleteWorkout from '../actions/DeleteWorkout';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';

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
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props);
  };

  const handleClose = () => {
    setOpen(false);
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
      Header: 'Date',
      accessor: 'date',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },

      Cell: row =>
        'duration' !== '' ? (
          <div>
            <Moment format="DD/MM/YYYY  HH:mm">{workouts.date}</Moment>
          </div>
        ) : (
          ' '
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

  if (props.workouts !== null) {
    return (
      <div>
        <Tooltip title="Show Workouts">
          <IconButton onClick={() => handleClickOpen()}>
            <ArrowForwardIcon></ArrowForwardIcon>
          </IconButton>
        </Tooltip>

        <Dialog
          fullScreen={fullScreen}
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
            <div className={classes.root}>
              <ReactTable
                minRows={10}
                filterable={false}
                data={workouts}
                columns={workoutColumns}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return (
    <div>
      <Tooltip title="Show Workouts">
        <IconButton onClick={() => handleClickOpen()}>
          <ArrowForwardIcon></ArrowForwardIcon>
        </IconButton>
      </Tooltip>

      <Dialog
        fullScreen={fullScreen}
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
          <h4>Customer has no workouts to show</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
