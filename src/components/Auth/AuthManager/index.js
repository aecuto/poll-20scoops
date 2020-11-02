import React, { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';

import routeUrlProvider, { LOGIN, DASHBOARD } from 'constants/route-paths';

import firebase from 'services/firebase';
import { getToken, removeToken } from 'services/auth/token';
import Snackbar from 'components/Toast/Snackbar';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [info, setInfo] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      firebase.auth().onAuthStateChanged(user => {
        if (user && check20scoopsUser(user)) {
          setInfo(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          removeToken();
        }
      });
    }
  }, [history, token]);

  const check20scoopsUser = user => {
    const email = user.email.split('@');
    if (email[1] !== '20scoops.com') {
      setError('Please login with @20scoops');
      return false;
    }
    return true;
  };

  return (
    <AuthManagerContext.Provider
      value={{
        info,
        setIsLoggedIn,
        setError
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(LOGIN)}
        publicKickTo={routeUrlProvider.getForRoute(DASHBOARD)}
        isVerifying={false}
      >
        {children}
        <Snackbar message={error} severity="error" />
      </AuthRouter>
    </AuthManagerContext.Provider>
  );
};

export const useContextAuthManager = () => {
  const context = useContext(AuthManagerContext);
  return context;
};

AuthManager.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object
};

export default withRouter(AuthManager);
