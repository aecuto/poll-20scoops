import React from 'react';

import routeUrlProvider, {
  SIGN_IN,
  GOOGLE_REDIRECT,
  POLL_LIST,
  POLL_CREATE,
  VOTE
} from 'constants/route-paths';

import PublicRoute from 'components/Auth/PublicRoute';
import PrivateRoute from 'components/Auth/PrivateRoute';

import SignIn from './pages/SignIn';
import GoogleRedirect from './pages/GoogleRedirect';

import PollList from './pages/Poll/List';
import PollSave from './pages/Poll/Save';

import Vote from './pages/Vote';

const pollRoute = () => {
  return (
    <>
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(POLL_LIST)}
        component={PollList}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(POLL_CREATE)}
        component={PollSave}
      />
    </>
  );
};

const Router = () => {
  return (
    <div>
      <PublicRoute
        exact
        path={routeUrlProvider.getForRoute(SIGN_IN)}
        component={SignIn}
      />
      <PublicRoute
        exact
        path={routeUrlProvider.getForRoute(GOOGLE_REDIRECT)}
        component={GoogleRedirect}
      />

      {pollRoute()}

      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(VOTE)}
        component={Vote}
      />
    </div>
  );
};

export default Router;
