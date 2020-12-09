import { reqGet } from '../poll';
import firebase from '../firebase';

export const db = firebase.firestore().collection('share-polls');

export const reqShare = async pollId => {
  const poll = await reqGet(pollId);
  const data = {
    ...poll,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};
