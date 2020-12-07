import firebase from '../firebase';

const db = firebase.firestore().collection('polls');

export const reqCreate = values => {
  return db.add(values);
};

export const reqUpdate = (id, values) => {
  return db.doc(id).update(values);
};

export const reqList = () => {
  return db.get().then(querySnapshot => {
    const list = [];
    querySnapshot.forEach(function(doc) {
      list.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return list;
  });
};

export const reqGet = pollId => {
  return db.doc(pollId).get();
};

export const reqDelete = pollId => {
  return db.doc(pollId).delete();
};
