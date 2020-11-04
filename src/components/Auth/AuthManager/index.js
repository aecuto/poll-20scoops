import React, { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';

import routeUrlProvider, { LOGIN, DASHBOARD } from 'constants/route-paths';

import firebase from 'services/firebase';
import { getToken, removeToken } from 'services/auth/token';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUserInfo(user);
          setIsLoggedIn(true);

          presence(user);
          listenOnline();
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
    displayName: user.displayName,
    photoURL: user.photoURL,
    state,
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  });

  const presence = user => {
    if (!user.uid) {
      return;
    }

    const userId = user.uid;

    const userRealtimeDb = firebase.database().ref(`/status/${userId}`);

    firebase
      .database()
      .ref('.info/connected')
      .on('value', snapshot => {
        if (snapshot.val() === false) {
          return;
        }
        userRealtimeDb
          .onDisconnect()
          .set(userState('offline', user))
          .then(() => {
            userRealtimeDb.set(userState('online', user));
          });
      });
  };

  const listenOnline = () => {
    firebase
      .database()
      .ref(`/status`)
      .orderByChild('lastChanged')
      .on('value', function(snapshot) {
        const users = [];

        snapshot.forEach(function(childSnapshot) {
          const childData = childSnapshot.val();
          users.push(childData);
        });

        const mockUser = [];
        for (let i = 0; i < 10; i += 1) {
          mockUser.push({
            displayName: 'test user',
            photoURL: null,
            state: 'offline',
            lastChanged: Date.now()
          });
        }
        const testUser = [...users, ...mockUser];

        setUsers(testUser);
      });
  };

  return (
    <AuthManagerContext.Provider
      value={{
        userInfo,
        setIsLoggedIn,
        setError,
        error,
        users
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(LOGIN)}
        publicKickTo={routeUrlProvider.getForRoute(DASHBOARD)}
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
