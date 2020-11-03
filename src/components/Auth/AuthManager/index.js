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

  const userState = (state, user, fs) => ({
    displayName: user.displayName,
    photoURL: user.photoURL,
    state,
    lastChanged: fs
      ? firebase.firestore.FieldValue.serverTimestamp()
      : firebase.database.ServerValue.TIMESTAMP
  });

  const presence = user => {
    if (!user.uid) {
      return;
    }

    const userId = user.uid;

    const userFirestore = firebase.firestore().doc(`/status/${userId}`);

    const userRealtimeDb = firebase.database().ref(`/status/${userId}`);

    firebase
      .database()
      .ref('.info/connected')
      .on('value', snapshot => {
        if (snapshot.val() === false) {
          userFirestore.set(userState('offline', user, true));
          return;
        }
        userRealtimeDb
          .onDisconnect()
          .set(userState('offline', user))
          .then(() => {
            userRealtimeDb.set(userState('online', user));
            userFirestore.set(userState('online', user, true));
          });
      });
  };

  const listenOnline = () => {
    firebase
      .firestore()
      .collection('status')
      .orderBy('lastChanged', 'desc')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          users.push(doc.data());
        });
        setUsers(users);
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
