import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { removeLocalStorage } from 'utils/localStorage';

import { setToken } from 'services/auth/token';
import { firebase } from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const GoogleRedirect = ({ theme }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

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
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette: { ...theme.mui.palette, primary: muiTheme.palette.primary }
      }}
    >
      <CssBaseline />
      <Backdrop open style={{ zIndex: 1 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </ThemeProvider>
  );
};

GoogleRedirect.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(GoogleRedirect);
