import { sub } from 'date-fns';
import {
  getDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from './firebase';

export const listsCollection = collection(db, 'lists');

export const getListFromDB = (token) => {
  const listRef = doc(listsCollection, token);
  return listRef;
};

export const addProductToList = async (productObj) => {
  const { token, name, howSoon } = productObj;

  const listRef = getListFromDB(token);
  await updateDoc(listRef, {
    items: arrayUnion({
      name,
      howSoon: parseInt(howSoon),
      lastPurchase: new Date(),
      totalPurchases: 0,
    }),
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

export const updatePurchaseTimeDB = async (token, item, state, estimate) => {
  //Encuentra la lista.
  const listRef = getListFromDB(token);
  const list = await getDoc(listRef);

  if (list.exists()) {
    const itemsFromList = list.data().items;

    //Encuentra el item a actualizar.
    const itemFinded = itemsFromList.find(
      (itemToCheck) => itemToCheck.name === item.name,
    );

    const thisItemUpdated = {
      ...itemFinded,
      lastPurchase: state ? sub(new Date(), { days: 1 }) : new Date(),
      totalPurchases: itemFinded.totalPurchases + 1,
      howSoon: estimate,
    };
    await updateDoc(listRef, { items: arrayUnion(thisItemUpdated) });
    await updateDoc(listRef, { items: arrayRemove(itemFinded) });
  }
};

export const deleteItem = async (token, itemToDelete) => {
  const dbRef = doc(db, 'lists', token);

  await updateDoc(dbRef, {
    items: arrayRemove(itemToDelete),
  });
};
