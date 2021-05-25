import firebase from '../firebase';

export const db = firebase.firestore().collection('share-polls');

export const reqShare = async (title, pollId, group) => {
  const data = {
    title,
    pollId,
    group,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};

export const reqDelete = shareId => {
  return db.doc(shareId).delete();
};
