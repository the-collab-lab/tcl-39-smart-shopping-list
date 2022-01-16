import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase';

export const productsCollection = collection(db, 'Products');

export const saveItem = (item) => {
  if (item) {
    addDoc(productsCollection, { item });
  }
  return;
};
