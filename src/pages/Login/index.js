import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './index.view';

// import routeUrlProvider, { DASHBOARD } from 'constants/route-paths';

import { setToken } from 'services/auth/token';
import { firebase, googleProvider } from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const Login = ({ theme, history }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const { setIsLoggedIn, setError } = useContextAuthManager();

  const [loading, setLoading] = useState(false);

  const googleSingIn = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        const { credential } = result;
        setToken(credential.accessToken);
        setIsLoggedIn(true);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette: { ...theme.mui.palette, primary: muiTheme.palette.primary }
      }}
    >
      <CssBaseline />
      <LoginView googleSingIn={googleSingIn} loading={loading} />
    </ThemeProvider>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Login);
