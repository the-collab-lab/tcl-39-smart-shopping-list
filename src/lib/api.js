import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const colRef = collection(db, 'Products');

export const saveItem = (item) => {
  if (item) {
    addDoc(colRef, { item });
  }
  return;
};
