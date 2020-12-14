import firebase from '../firebase';

export const db = firebase.firestore().collection('vote');

export const reqVote = values => {
  const data = {
    ...values,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};
