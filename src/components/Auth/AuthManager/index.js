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
        } else {
          setIsLoggedIn(false);
          removeToken();
        }
        userOnline();
      });
    }
  }, [history, token]);

  const userOnline = () => {
    if (!isLoggedIn) {
      return;
    }

    const userId = info.uid;

    // const userStatusFirestoreRef = firebase
    //   .firestore()
    //   .doc(`/status/${userId}`);

    const userStatusDatabaseRef = firebase.database().ref(`/status/${userId}`);

    // const isOfflineForFirestore = {
    //   state: 'offline',
    //   last_changed: firebase.firestore.FieldValue.serverTimestamp()
    // };

    // const isOnlineForFirestore = {
    //   state: 'online',
    //   last_changed: firebase.firestore.FieldValue.serverTimestamp()
    // };

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    // const isOnlineForDatabase = {
    //   state: 'online',
    //   last_changed: firebase.database.ServerValue.TIMESTAMP
    // };

    firebase
      .database()
      .ref('.info/connected')
      .on('value', function(snapshot) {
        if (snapshot.val()) {
          console.log('connect');
          userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
        } else {
          console.log('Disconnect');
        }
        // if (snapshot.val() === false) {
        //   console.log('offline', userId);
        //   userStatusFirestoreRef.set(isOfflineForFirestore);
        // }

        //   .then(function() {
        //     console.log('online', userId);

        //     userStatusDatabaseRef.set(isOnlineForDatabase);

        //     // We'll also add Firestore set here for when we come online.
        //     userStatusFirestoreRef.set(isOnlineForFirestore);
        //   });
      });
  };

  const check20scoopsUser = user => {
    const email = user.email.split('@');
    if (email[1] !== '20scoops.com') {
      setError('Please login with @20scoops');
      return false;
    }
    return true;
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
