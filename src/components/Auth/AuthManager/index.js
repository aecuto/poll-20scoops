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
          userOnline(user);
          setInfo(user);
          setIsLoggedIn(true);
          firebase.database().goOnline();
        } else {
          setIsLoggedIn(false);
          removeToken();
          firebase.database().goOffline();
        }
      });
    }
  }, [history, token]);

  const firestoreState = state => ({
    state,
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  });

  const databaseState = state => ({
    state,
    last_changed: firebase.database.ServerValue.TIMESTAMP
  });

  const userOnline = user => {
    if (!user.uid) {
      return;
    }

    const userId = user.uid;

    const userFirestore = firebase.firestore().doc(`/status/${userId}`);

    const userDatabase = firebase.database().ref(`/status/${userId}`);

    firebase
      .database()
      .ref('.info/connected')
      .on('value', function(snapshot) {
        if (snapshot.val() === false) {
          userFirestore.set(firestoreState('offline'));
          return;
        }
        userDatabase
          .onDisconnect()
          .set(databaseState('offline'))
          .then(function() {
            userDatabase.set('online');
            userFirestore.set(firestoreState('online'));
          });
      });
  };

  // const check20scoopsUser = user => {
  //   const email = user.email.split('@');
  //   if (email[1] !== '20scoops.com') {
  //     setError('Please login with @20scoops');
  //     return false;
  //   }
  //   return true;
  // };

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
