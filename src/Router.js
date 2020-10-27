import React from 'react';
import routeUrlProvider, {
  LOGIN,
  DASHBOARD,
  USER_CREATE,
  USER_LIST,
  USER_EDIT,
  PRODUCT_TABLE
} from 'constants/route-paths';

import PublicRoute from 'components/Auth/PublicRoute';
import PrivateRoute from 'components/Auth/PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserCreate from './pages/User/Create';
import UserList from './pages/User/List';
import UserEdit from './pages/User/Edit';
import ProductTable from './pages/ProductTable';

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
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(USER_CREATE)}
        component={UserCreate}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(USER_LIST)}
        component={UserList}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(USER_EDIT)}
        component={UserEdit}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(PRODUCT_TABLE)}
        component={ProductTable}
      />
    </div>
  );
};

export default Router;
