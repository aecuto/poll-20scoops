import PropTypes from 'prop-types';
import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';

import FlareIcon from '@material-ui/icons/Flare';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { DASHBOARD } from 'constants/route-paths';
import firebase from 'services/firebase';

import useStyles from './useStyles';
import UserState from './UsersState';

const LayoutView = ({
  children,
  menuLink,
  menuSelected,
  themeMode,
  changeMode,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen
}) => {
  const classes = useStyles();

  const onLogout = () => {
    firebase.auth().signOut();
  };

  const drawer = (
    <div>
      <ListItem>
        <ListItemText primary="Poll 20scoops" secondary="@OKRs" />
      </ListItem>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => menuLink(DASHBOARD)}
          selected={menuSelected === DASHBOARD}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: '1' }} />
          <UserState />
          <IconButton color="inherit" onClick={() => changeMode()}>
            {themeMode === 'dark' ? <Brightness4Icon /> : <FlareIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

LayoutView.propTypes = {
  changeMode: PropTypes.func,
  children: PropTypes.any,
  drawerOpen: PropTypes.any,
  handleDrawerClose: PropTypes.any,
  handleDrawerOpen: PropTypes.any,
  label: PropTypes.any,
  menuLink: PropTypes.func,
  menuSelected: PropTypes.any,
  themeMode: PropTypes.string
};

export default LayoutView;
