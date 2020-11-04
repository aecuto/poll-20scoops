import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import SignInView from './index.view';
import routeUrlProvider, { GOOGLE_REDIRECT } from 'constants/route-paths';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import firebase from 'services/firebase';

import { setLocalStorage, getLocalStorage } from 'utils/localStorage';

const SignIn = ({ theme, history }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const googleState = getLocalStorage('googleState');

  useEffect(() => {
    if (googleState) {
      history.push(routeUrlProvider.getForLink(GOOGLE_REDIRECT));
    }
  }, []);

  const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
      hd: '20scoops.com',
      prompt: 'consent'
    });

    setLocalStorage('googleState', 'redirect');
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
      <SignInView googleSignIn={googleSignIn} />
    </ThemeProvider>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(SignIn);
