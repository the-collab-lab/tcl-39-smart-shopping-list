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
  const listRef = doc(listsCollection, token);
  return listRef;
};

export const addProductToList = async (productObj) => {
  const { token, name, howSoon, lastPurch } = productObj;

  const listRef = getListFromDB(token);
  await updateDoc(listRef, {
    items: arrayUnion({ name, howSoon: parseInt(howSoon), lastPurch }),
  });
};

export const getItemsFromList = async (token) => {
  const listRef = getListFromDB(token);
  const list = await getDoc(listRef);

  const itemsFromList = list.data().items;

  if (itemsFromList) {
    return itemsFromList;
  }
};
