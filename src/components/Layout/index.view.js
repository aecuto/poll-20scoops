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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';

import NotificationsIcon from '@material-ui/icons/Notifications';
import FlareIcon from '@material-ui/icons/Flare';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from './useStyles';
import { DASHBOARD } from 'constants/route-paths';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AlternateEmailIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">cms-demo@20scoops.com</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Setting</Typography>
              </MenuItem>
            </Menu>
          </div>
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
