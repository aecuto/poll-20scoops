import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LayoutView from './index.view';
import theme from 'styles/theme';
import { setLocalStorage, getLocalStorage } from 'utils/localStorage';

import Snackbar from 'components/Toast/Snackbar';
import { useContextAuthManager } from 'components/Auth/AuthManager';

const Layout = ({ children }) => {
  const { error } = useContextAuthManager();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(
    getLocalStorage('themeMode') || 'light'
  );

  const muiTheme = type => {
    return createMuiTheme({
      palette: {
        type,
        primary: {
          main: theme.color.cyan[700]
        }
      },
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: theme.color.appBar[type]
          }
        }
      }
    });
  };

  const changeMode = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setLocalStorage('themeMode', newThemeMode);
    setThemeMode(newThemeMode);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const props = {
    children,
    themeMode,
    changeMode,
    handleDrawerOpen,
    handleDrawerClose,
    drawerOpen
  };

  const { palette, overrides } = muiTheme(themeMode);

  return (
    <ThemeProvider
      theme={{
        ...theme.mui,
        palette,
        overrides
      }}
    >
      <CssBaseline />
      <LayoutView {...props} />
      <Snackbar message={error} severity="error" />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
  label: PropTypes.any,
  location: PropTypes.any
};

export default Layout;
