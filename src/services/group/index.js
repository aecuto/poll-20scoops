import firebase from '../firebase';

const db = firebase.firestore().collection('groups');

export const reqCreate = values => {
  const data = {
    ...values,
    created_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.add(data);
};

export const reqUpdate = (id, values) => {
  const data = {
    ...values,
    updated_at: firebase.firestore.FieldValue.serverTimestamp()
  };
  return db.doc(id).update(data);
};

export const reqList = () => {
  return db
    .orderBy('created_at', 'desc')
    .get()
    .then(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return list;
    });
};

export const reqGet = groupId => {
  return db
    .doc(groupId)
    .get()
    .then(doc => ({ id: doc.id, ...doc.data() }));
};

export const reqDelete = groupId => {
  return db.doc(groupId).delete();
};
