import { collection, addDoc, doc } from 'firebase/firestore';

import { db } from './firebase';

export const productsCollection = collection(db, 'Products');
export const listsCollection = collection(db, 'lists');

export const saveItem = (item) => {
  if (item) {
    addDoc(productsCollection, { item });
  }
  return;
};

export const getListFromDB = (token) => {
  const list = doc(listsCollection, token);
  return list;
};
