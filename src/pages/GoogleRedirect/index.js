import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import routeUrlProvider, { SIGN_IN } from 'constants/route-paths';

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
          history.push(routeUrlProvider.getForLink(SIGN_IN));
          return;
        }

        const { credential } = result;
        setToken(credential.accessToken);
        setIsLoggedIn(true);
      })
      .catch(error => {
        setError({ text: error.message, lastUpdated: Date.now() });
      });
  };

  return (
    <Backdrop open style={{ backgroundColor: 'inherit' }}>
      <CircularProgress thickness={10} size={60} />
    </Backdrop>
  );
};

GoogleRedirect.propTypes = {
  history: PropTypes.any
};

export default GoogleRedirect;
