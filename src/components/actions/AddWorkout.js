import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';

export default function AddWorkout(props) {
  const [open, setOpen] = React.useState(false);
  const [workout, setWorkouts] = React.useState({
    date: '',
    duration: '',
    activity: '',
    customer: props.customer.links[1].href
  });
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = e => {
    setWorkouts({
      ...workout,
      [e.target.name]: e.target.value,
      date: selectedDate
    });
  };

  const addWorkout = () => {
    props.saveWorkout(workout);
    handleClose();
  };

  //

  return (
    <div>
      <Tooltip title="Add Workout">
        <IconButton onClick={() => handleClickOpen()}>
          <AddBox />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add a New Workout to {props.customer.firstname}{' '}
          {props.customer.lastname}
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoFocus
              margin="dense"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
              label="Date"
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            name="duration"
            value={workout.duration}
            onChange={e => handleInputChange(e)}
            label="Duration in minutes"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={workout.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addWorkout} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
