import { db } from './firebase';
import { collection, getDocs, query, addDoc } from 'firebase/firestore';

export const saveItem = (item) => {
  addDoc(collection(db, 'Products'), { item });
};

export const getItems = async () => {
  const result = await getDocs(query(collection(db, 'Products')));
  return result;
};
