import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';

import routeUrlProvider, { VOTE, POLL_LIST } from 'constants/route-paths';

import { setLocalStorage, getLocalStorage } from 'utils/localStorage';

const Component = ({ history }) => {
  const menuSelected = getLocalStorage('menuSelected') || 'VOTE';

  const menuLink = path => {
    setLocalStorage('menuSelected', path);
    history.push(routeUrlProvider.getForLink(path));
  };

  return (
    <List>
      <ListItem
        button
        onClick={() => menuLink(VOTE)}
        selected={menuSelected === VOTE}
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
        <ListItemText primary="Create a Poll" />
      </ListItem>
    </List>
  );
};

Component.propTypes = {
  history: PropTypes.object
};

export default withRouter(Component);
