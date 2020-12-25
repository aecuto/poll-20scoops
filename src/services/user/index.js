import firebase from '../firebase';

const db = firebase.database().ref('users');

export const getList = () => {
  let data = {};
  db.once('value', snapshot => {
    data = snapshot.val();
  });

  return data;
};
