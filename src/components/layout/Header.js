import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: '#d3d3d3',
    color: 'black'
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  list: {
    width: 250
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

export default function Header() {
  const classes = useStyles();
  const [title, setTitle] = useState('Home');
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const onItemClick = title => () => {
    setTitle(title);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Divider />

        <ListItem button component={Link} to="/" onClick={onItemClick('Home')}>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/Customers"
          onClick={onItemClick('Customers')}
        >
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>Customers</ListItemText>
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/Workouts"
          onClick={onItemClick('Workouts')}
        >
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>All Workouts</ListItemText>
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/Calendar"
          onClick={onItemClick('Calendar')}
        >
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>Calendar</ListItemText>
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/Statistics"
          onClick={onItemClick('Statistics')}
        >
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>Statistics</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
          </Drawer>
          <Typography className={classes.title} variant="h4">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
