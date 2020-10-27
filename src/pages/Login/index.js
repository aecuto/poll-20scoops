import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
// import { FORM_ERROR } from 'final-form';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginView from './index.view';

import routeUrlProvider, { DASHBOARD } from 'constants/route-paths';
import { useContextAuthManager } from 'components/Auth/AuthManager';

const Login = ({ theme, history }) => {
  const { setIsLoggedIn } = useContextAuthManager();
  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.blueGrey[500]
      }
    }
  });

  const onSubmit = values => {
    setIsLoggedIn(true);
    history.push(routeUrlProvider.getForLink(DASHBOARD));
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
