import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function DeleteWorkout(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // EI TOIMI OIKEIN!!!

  const deleteWorkout = () => {
    props.deleteWorkout(props.id);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={() => handleClickOpen()}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'You are about to delete '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this workout from the database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            workout={props.row}
            onClick={deleteWorkout}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
