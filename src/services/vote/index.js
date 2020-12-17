import firebase from '../firebase';

export const db = firebase.firestore().collection('vote');

export const reqVote = values => {
  const data = {
    ...values,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};

export const getVote = (pollId, uid) => {
  return db
    .where('pollId', '==', pollId)
    .where('uid', '==', uid)
    .get()
    .then(querySnapshot => {
      let data = {};
      querySnapshot.forEach(doc => {
        data = doc.data();
      });

      return data;
    });
};
