import React, { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { AuthRouter } from '..';

import routeUrlProvider, { LOGIN, DASHBOARD } from 'constants/route-paths';

import firebase from 'services/firebase';
import { getToken, removeToken } from 'services/auth/token';
import Snackbar from 'components/Toast/Snackbar';

export const AuthManagerContext = createContext({});

const AuthManager = ({ children, history }) => {
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [info, setInfo] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setInfo(user);
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

  const firestoreState = (state, name) => ({
    name,
    state,
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  });

  const databaseState = (state, name) => ({
    name,
    state,
    last_changed: firebase.database.ServerValue.TIMESTAMP
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
          userFirestore.set(firestoreState('offline', user.displayName));
          return;
        }
        userRealtimeDb
          .onDisconnect()
          .set(databaseState('offline', user.displayName))
          .then(() => {
            userRealtimeDb.set(databaseState('online', user.displayName));
            userFirestore.set(firestoreState('online', user.displayName));
          });
      });
  };

  const listenOnline = () => {
    firebase
      .firestore()
      .collection('status')
      .where('state', '==', 'online')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log(`${change.doc.data().name} is online`);
          }
          if (change.type === 'removed') {
            console.log(`${change.doc.data().name} is offline`);
          }
        });
      });
  };

  return (
    <AuthManagerContext.Provider
      value={{
        info,
        setIsLoggedIn,
        setError
      }}
    >
      <AuthRouter
        isAuth={isLoggedIn}
        privateKickTo={routeUrlProvider.getForRoute(LOGIN)}
        publicKickTo={routeUrlProvider.getForRoute(DASHBOARD)}
        isVerifying={false}
      >
        {children}
        <Snackbar message={error} severity="error" />
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
