import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import routeUrlProvider, { SIGN_IN } from 'constants/route-paths';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { removeLocalStorage } from 'utils/localStorage';

import { setToken } from 'services/auth/token';
import firebase from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';
import { useTranslation } from 'react-i18next';

const GoogleRedirect = ({ history }) => {
  const { t } = useTranslation();
  const { setIsLoggedIn, setError } = useContextAuthManager();

  useEffect(() => {
    removeLocalStorage('googleState');
    googleSignInResult();
    setInterval(() => {
      timeOutSignIn();
    }, 1000 * 10);
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

  const timeOutSignIn = () => {
    setError({ text: t('timeout'), lastUpdated: Date.now() });
    history.push(routeUrlProvider.getForLink(SIGN_IN));
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
