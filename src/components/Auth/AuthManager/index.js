import React, { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';
import routeUrlProvider, { SIGN_IN, VOTE_LIST } from 'constants/route-paths';

import firebase from 'services/firebase';
import { getToken, removeToken } from 'services/auth/token';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const { t } = useTranslation();
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      firebase.auth().onAuthStateChanged(user => {
        if (user && check20scoopsUser(user)) {
          presence(user);
          getUserInfo(user.uid);

          setIsLoggedIn(true);
          setUserInfo(user);

          firebase.database().goOnline();
        } else {
          setIsLoggedIn(false);
          removeToken();

          firebase.database().goOffline();
          setIsLoading(false);
        }
      });
    }
  }, [history, token]);

  const check20scoopsUser = user => {
    const email = user.email.split('@');
    if (email[1] !== '20scoops.com') {
      setError({
        text: t('sign_with_20scoops'),
        lastUpdated: Date.now()
      });
      return false;
    }
    return true;
  };

  const userState = (state, user) => ({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    state,
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  });

  const presence = user => {
    const userRealtimeDb = firebase.database().ref(`/users/${user.uid}`);

    firebase
      .database()
      .ref('.info/connected')
      .on('value', snapshot => {
        if (snapshot.val() === false) {
          return;
        }
        userRealtimeDb
          .onDisconnect()
          .update(userState('offline', user))
          .then(() => {
            userRealtimeDb.update(userState('online', user));
          });
      });
  };

  const getUserInfo = userId => {
    const userRealtimeDb = firebase.database().ref(`/users/${userId}`);

    userRealtimeDb.once('value').then(snapshot => {
      setIsAdmin(snapshot.val().role === 'admin');
      setIsLoading(false);
    });
  };

  const rederLoading = () => {
    return (
      <Backdrop open style={{ backgroundColor: 'inherit' }}>
        <CircularProgress thickness={5} size={60} />
      </Backdrop>
    );
  };

  return (
    <AuthManagerContext.Provider
      value={{
        userInfo,
        setUserInfo,
        setIsLoggedIn,
        error,
        setError,
        isAdmin
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(SIGN_IN)}
        publicKickTo={routeUrlProvider.getForRoute(VOTE_LIST)}
        isVerifying={false}
      >
        {isLoading ? rederLoading() : children}
      </AuthRouter>
    </AuthManagerContext.Provider>
  );
};

export const useContextAuthManager = () => {
  const context = useContext(AuthManagerContext);
  return context;
};

AuthManager.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object
};

export default withRouter(AuthManager);
