import React from 'react';

import routeUrlProvider, { LOGIN, DASHBOARD } from 'constants/route-paths';

import PublicRoute from 'components/Auth/PublicRoute';
import PrivateRoute from 'components/Auth/PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Router = () => {
  return (
    <div>
      <PublicRoute
        exact
        path={routeUrlProvider.getForRoute(LOGIN)}
        component={Login}
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
