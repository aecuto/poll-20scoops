import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import routeUrlProvider, { LOGIN } from 'constants/route-paths';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { removeLocalStorage } from 'utils/localStorage';

import { setToken } from 'services/auth/token';
import firebase from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const GoogleRedirect = ({ history }) => {
  const { setIsLoggedIn, setError } = useContextAuthManager();

  useEffect(() => {
    removeLocalStorage('googleState');
    googleSignInResult();
  }, []);

  const googleSignInResult = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (!result.user) {
          history.push(routeUrlProvider.getForLink(LOGIN));
          return;
        }

        const { credential } = result;
        setToken(credential.accessToken);
        setIsLoggedIn(true);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <Backdrop open style={{ backgroundColor: 'inherit' }}>
      <CircularProgress />
    </Backdrop>
  );
};

GoogleRedirect.propTypes = {
  history: PropTypes.any
};

export default GoogleRedirect;
