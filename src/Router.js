import React from 'react';

import routeUrlProvider, {
  SIGN_IN,
  GOOGLE_REDIRECT,
  POLL_LIST,
  POLL_SAVE,
  VOTE_LIST,
  VOTE_ANSWER,
  VOTE_RESULT
} from 'constants/route-paths';

import PublicRoute from 'components/Auth/PublicRoute';
import PrivateRoute from 'components/Auth/PrivateRoute';

import SignIn from './pages/SignIn';
import GoogleRedirect from './pages/GoogleRedirect';

import PollList from './pages/Poll/List';
import PollSave from './pages/Poll/Save';

import VoteList from './pages/Vote/List';
import VoteAnswer from './pages/Vote/Answer';
import VoteResult from './pages/Vote/Result';

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
        path={routeUrlProvider.getForRoute(POLL_SAVE)}
        component={PollSave}
      />
    </>
  );
};

const voteRoute = () => {
  return (
    <>
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(VOTE_LIST)}
        component={VoteList}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(VOTE_ANSWER)}
        component={VoteAnswer}
      />
      <PrivateRoute
        exact
        path={routeUrlProvider.getForRoute(VOTE_RESULT)}
        component={VoteResult}
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
      {voteRoute()}
    </div>
  );
};

export default Router;
