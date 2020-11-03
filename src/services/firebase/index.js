import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

export default firebase;
