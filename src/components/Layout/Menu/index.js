import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import routeUrlProvider, { VOTE_LIST, POLL_LIST } from 'constants/route-paths';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const Component = ({ history, menu }) => {
  const { isAdmin } = useContextAuthManager();

  const menuLink = path => {
    history.push(routeUrlProvider.getForLink(path));
  };

  const activeMenu = path => {
    return menu === path;
  };

  return (
    <List>
      <ListItem
        button
        onClick={() => menuLink(VOTE_LIST)}
        selected={activeMenu(VOTE_LIST)}
      >
        <ListItemIcon>
          <ThumbUpIcon />
        </ListItemIcon>
        <ListItemText primary="Vote Polls" />
      </ListItem>
      {isAdmin && (
        <ListItem
          button
          onClick={() => menuLink(POLL_LIST)}
          selected={activeMenu(POLL_LIST)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Poll List" />
        </ListItem>
      )}
    </List>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  menu: PropTypes.any
};

export default withRouter(Component);
