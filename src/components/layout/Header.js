import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
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
    marginRight: theme.spacing(2)
  },
  toolbar: {
    //minHeight: 128,
    alignItems: 'flex-start',
    //paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
    backgroundColor: '#d3d3d3',
    color: 'black',
    //textAlign: 'right',
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end'
  },
  list: {
    width: 250
  },
  fab: {
    margin: theme.spacing(1)
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
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
          to="/CustomersMT"
          onClick={onItemClick('CustomersMT')}
        >
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText>Customers MT</ListItemText>
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
          <Typography className={classes.title} variant="h5" noWrap>
            Personal Trainer
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
