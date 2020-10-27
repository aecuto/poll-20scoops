import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './index.view';

import { login } from 'services/auth';
import { setToken } from 'services/auth/token';

import routeUrlProvider, { DASHBOARD } from 'constants/route-paths';

const Login = ({ theme, history }) => {
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const onSubmit = values => {
    return login(values)
      .then(res => {
        setToken(res.token);
        history.push(routeUrlProvider.getForLink(DASHBOARD));
      })
      .catch(error => ({ [FORM_ERROR]: error.message }));
  };

  const props = {
    onSubmit
  };

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette: { ...theme.mui.palette, primary: muiTheme.palette.primary }
      }}
    >
      <CssBaseline />
      <LoginView {...props} />
    </ThemeProvider>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.object
};

export default withTheme(Login);
