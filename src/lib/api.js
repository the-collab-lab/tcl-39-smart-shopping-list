import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

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

export const addProductToList = async (productObj) => {
  const { token, name, howSoon, lastPurch } = productObj;

  const list = doc(listsCollection, token);
  await updateDoc(list, {
    items: arrayUnion({ name, howSoon: parseInt(howSoon), lastPurch }),
  });
};
