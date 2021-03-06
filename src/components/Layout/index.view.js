import PropTypes from 'prop-types';
import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';

import FlareIcon from '@material-ui/icons/Flare';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import firebase from 'services/firebase';

import useStyles from './useStyles';
import Menu from './Menu';
import UsersState from './UsersState';
import { useTranslation } from 'react-i18next';

const LayoutView = ({
  children,
  themeMode,
  changeMode,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
  menu
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const onLogout = () => {
    firebase.auth().signOut();
  };

  const drawer = menu => {
    return (
      <div>
        <ListItem>
          <ListItemText
            primary={t('primary_title')}
            secondary={t('secondary_title')}
          />
        </ListItem>
        <Divider />
        <Menu menu={menu} />
      </div>
    );
  };

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
          <UsersState />
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
            {drawer(menu)}
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
            {drawer(menu)}
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
  handleDrawerOpen: PropTypes.func,
  menu: PropTypes.any,
  themeMode: PropTypes.string
};

export default LayoutView;
