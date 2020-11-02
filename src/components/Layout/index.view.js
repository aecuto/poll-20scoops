import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';

import FlareIcon from '@material-ui/icons/Flare';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useStyles from './useStyles';
import { DASHBOARD } from 'constants/route-paths';

import firebase from 'services/firebase';

const Title = styled(Typography)`
  && {
    flex: 1;
  }
`;

const LayoutView = ({
  children,
  label,
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

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <Title variant="h3" noWrap>
            {label}
          </Title>
          <IconButton color="inherit" onClick={() => changeMode()}>
            {themeMode === 'dark' ? <Brightness4Icon /> : <FlareIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
      >
        <div className={classes.toolbar}>
          <Title style={{ paddingLeft: '10px' }} noWrap>
            <b>CMS Boilerplate Demo</b>
          </Title>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
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
      </Drawer>

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
