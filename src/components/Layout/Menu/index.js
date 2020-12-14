import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';

import routeUrlProvider, { VOTE_LIST, POLL_LIST } from 'constants/route-paths';

import { setLocalStorage, getLocalStorage } from 'utils/localStorage';

const Component = ({ history }) => {
  const menuSelected = getLocalStorage('menuSelected') || 'VOTE_LIST';

  const menuLink = path => {
    setLocalStorage('menuSelected', path);
    history.push(routeUrlProvider.getForLink(path));
  };

  return (
    <List>
      <ListItem
        button
        onClick={() => menuLink(VOTE_LIST)}
        selected={menuSelected === VOTE_LIST}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Vote Polls" />
      </ListItem>
      <ListItem
        button
        onClick={() => menuLink(POLL_LIST)}
        selected={menuSelected === POLL_LIST}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Poll List" />
      </ListItem>
    </List>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default withRouter(Component);
