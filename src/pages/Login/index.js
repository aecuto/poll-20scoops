import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import GoogleRedirect from './GoogleRedirect';

import LoginView from './index.view';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { firebase, googleProvider } from 'services/firebase';

import { setLocalStorage, getLocalStorage } from 'utils/localStorage';

const Login = ({ theme }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const googleStatus = getLocalStorage('googleStatus');

  const googleSignIn = () => {
    setLocalStorage('googleStatus', 'redirect');
    firebase.auth().signInWithRedirect(googleProvider);
  };

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette: { ...theme.mui.palette, primary: muiTheme.palette.primary }
      }}
    >
      <CssBaseline />
      {googleStatus && <GoogleRedirect />}
      {!googleStatus && <LoginView googleSignIn={googleSignIn} />}
    </ThemeProvider>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Login);
