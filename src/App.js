import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyled from './GlobalStyled';
import theme from './styles/theme';
import Router from './Router';
import getStore from './stores';
import './i18n';

import ScrollToTop from './components/ScrollToTop';
import RemoveFocusWhenNotTab from './components/RemoveFocusWhenNotTab';
import AuthManager from 'components/Auth/AuthManager';

const store = getStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthManager>
            <ScrollToTop>
              <>
                <Router />
                <GlobalStyled />
                <RemoveFocusWhenNotTab />
              </>
            </ScrollToTop>
          </AuthManager>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
