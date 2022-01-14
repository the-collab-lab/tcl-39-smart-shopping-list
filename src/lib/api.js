import { db } from './firebase';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';

const colRef = collection(db, 'Products');

export const saveItem = (item) => {
  if (item) {
    addDoc(colRef, { item });
  }
  return;
};

export const getItems = async () => {
  const result = await getDocs(query(colRef));
  return result;
};
