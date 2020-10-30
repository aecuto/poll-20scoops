import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { setToken } from 'services/auth/token';
import { firebase } from 'services/firebase';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const Login = ({ theme }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const { setIsLoggedIn, setError } = useContextAuthManager();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    googleSignInResult();
  }, []);

  const googleSignInResult = () => {
    setLoading(true);
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
      <Backdrop open={loading} style={{ zIndex: 1 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </ThemeProvider>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Login);
