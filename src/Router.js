import React from 'react';

import routeUrlProvider, {
  LOGIN,
  GOOGLE_REDIRECT,
  DASHBOARD
} from 'constants/route-paths';

import PublicRoute from 'components/Auth/PublicRoute';
import PrivateRoute from 'components/Auth/PrivateRoute';

import Login from './pages/Login';
import GoogleRedirect from './pages/GoogleRedirect';
import Dashboard from './pages/Dashboard';

const Router = () => {
  return (
    <div>
      <PublicRoute
        exact
        path={routeUrlProvider.getForRoute(LOGIN)}
        component={Login}
      />
      <PublicRoute
        exact
        path={routeUrlProvider.getForRoute(GOOGLE_REDIRECT)}
        component={GoogleRedirect}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(DASHBOARD)}
        component={Dashboard}
      />
    </div>
  );
};

export default Router;
