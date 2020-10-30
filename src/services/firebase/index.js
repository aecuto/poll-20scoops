import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './config';

import routeUrlProvider, { GOOGLE_REDIRECT } from 'constants/route-paths';

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  hd: '20scoops.com',
  prompt: 'consent',
  state: routeUrlProvider.getForLink(GOOGLE_REDIRECT)
});

export { firebase, googleProvider };
