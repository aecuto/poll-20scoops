import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LayersIcon from '@material-ui/icons/Layers';

import routeUrlProvider, {
  VOTE_LIST,
  POLL_LIST,
  GROUP_LIST
} from 'constants/route-paths';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const Component = ({ history, menu }) => {
  const { isAdmin } = useContextAuthManager();

  const menuLink = path => {
    history.push(routeUrlProvider.getForLink(path));
  };

  const activeMenu = path => {
    return menu === path;
  };

  const adminMenu = () => {
    return (
      <>
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
        <ListItem
          button
          onClick={() => menuLink(GROUP_LIST)}
          selected={activeMenu(GROUP_LIST)}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Group List" />
        </ListItem>
      </>
    );
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
      {isAdmin && adminMenu()}
    </List>
  );
};

Component.propTypes = {
  history: PropTypes.object,
  menu: PropTypes.any
};

export default withRouter(Component);
