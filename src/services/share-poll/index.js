import firebase from '../firebase';

export const db = firebase.firestore().collection('share-polls');

export const reqShare = async (title, pollId) => {
  const data = {
    title,
    pollId,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};