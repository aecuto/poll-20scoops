import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';

import routeUrlProvider, { LOGIN, DASHBOARD } from 'constants/route-paths';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [info, setInfo] = useState({});

  // useEffect(() => {
  //   if (token) {
  //     getMe()
  //       .then(res => {
  //         setIsLoggedIn(true);
  //         setInfo(res);
  //       })
  //       .catch(() => {
  //         removeToken();
  //         setIsLoggedIn(false);
  //       });
  //   }
  // }, [history, token]);

  return (
    <AuthManagerContext.Provider
      value={{
        // info,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(LOGIN)}
        publicKickTo={routeUrlProvider.getForRoute(DASHBOARD)}
        isVerifying={false}
      >
        {children}
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
