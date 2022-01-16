import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebase';

const colRef = collection(db, 'Products');

export const saveItem = (item) => {
  if (item) {
    addDoc(colRef, { item });
  }
  return;
};
