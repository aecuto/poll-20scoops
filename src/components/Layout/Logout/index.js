import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import routeUrlProvider, { LOGIN } from 'constants/route-paths';
import { removeToken } from 'services/auth/token';

import { useContextAuthManager } from 'components/Auth/AuthManager';

import LogoutView from './index.view';

const Logout = ({ history }) => {
  const { isLoggedIn, setIsLoggedIn } = useContextAuthManager();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    removeToken();
    setIsLoggedIn(false);
    history.push(routeUrlProvider.getForLink(LOGIN));
  };

  if (!isLoggedIn) {
    return null;
  }

  const porps = {
    open,
    handleOpen,
    handleClose,
    onClick
  };

  return <LogoutView {...porps} />;
};

Logout.propTypes = {
  history: PropTypes.object
};

export default withRouter(Logout);
