import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LayoutView from './index.view';
import routeUrlProvider from 'constants/route-paths';
import theme from 'styles/theme';
import { setLocalStorage, getLocalStorage } from 'services/layout';

const Layout = ({ history, children, label }) => {
  const [drawerOpen, setDrawerOpen] = useState(
    getLocalStorage('drawerOpen') === 'false' ? false : true
  );
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

  const menuLink = path => {
    setLocalStorage('menuSelected', path);
    history.push(routeUrlProvider.getForLink(path));
  };

  const changeMode = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setLocalStorage('themeMode', newThemeMode);
    setThemeMode(newThemeMode);
  };

  const handleDrawerOpen = () => {
    setLocalStorage('drawerOpen', true);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setLocalStorage('drawerOpen', false);
    setDrawerOpen(false);
  };

  const menuSelected = getLocalStorage('menuSelected') || 'DASHBOARD';

  const props = {
    children,
    label,
    menuLink,
    menuSelected,
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
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
  label: PropTypes.any,
  location: PropTypes.any
};

export default withRouter(Layout);
