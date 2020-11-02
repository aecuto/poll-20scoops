import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import GoogleRedirect from './GoogleRedirect';

import LoginView from './index.view';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import firebase from 'services/firebase';

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
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
      hd: '20scoops.com',
      prompt: 'consent'
    });

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
