import React, { useEffect } from 'react';

// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { removeLocalStorage } from 'utils/localStorage';

import { setToken } from 'services/auth/token';
import { firebase } from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const GoogleRedirect = () => {
  const { setIsLoggedIn, setError } = useContextAuthManager();

  useEffect(() => {
    googleSignInResult();
    removeLocalStorage('googleStatus');
  }, []);

  const googleSignInResult = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (!result.user) {
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

export default GoogleRedirect;
