import React, { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';
import routeUrlProvider, { SIGN_IN, VOTE_LIST } from 'constants/route-paths';

import firebase from 'services/firebase';
import { getToken, removeToken } from 'services/auth/token';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(true);
          setUserInfo(user);

          if (user.uid) {
            presence(user);
          }

          firebase.database().goOnline();
        } else {
          setIsLoggedIn(false);
          removeToken();

          firebase.database().goOffline();
        }
      });
    }
  }, [history, token]);

  // const check20scoopsUser = user => {
  //   const email = user.email.split('@');
  //   if (email[1] !== '20scoops.com') {
  //     setError('Please login with @20scoops');
  //     return false;
  //   }
  //   return true;
  // };

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

  return (
    <AuthManagerContext.Provider
      value={{
        userInfo,
        setUserInfo,
        setIsLoggedIn,
        error,
        setError
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(SIGN_IN)}
        publicKickTo={routeUrlProvider.getForRoute(VOTE_LIST)}
        isVerifying={false}
      >
        {children}
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
