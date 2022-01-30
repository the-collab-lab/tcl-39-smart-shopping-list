import {
  getDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { db } from './firebase';

export const listsCollection = collection(db, 'lists');

export const getListFromDB = (token) => {
  const list = doc(listsCollection, token);
  return list;
};

export const addProductToList = async (productObj) => {
  const { token, name, howSoon, lastPurch } = productObj;

  const list = doc(listsCollection, token);
  await updateDoc(list, {
    items: arrayUnion({ name, howSoon: parseInt(howSoon), lastPurch }),
  });
};

export const getDataOnce = async (token) => {
  const docRef = doc(db, 'lists', token);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { items } = docSnap.data();
    if (items !== undefined) {
      return items;
    }
    return [];
  } else {
    window.alert('Not document found');
    return [];
  }
};
