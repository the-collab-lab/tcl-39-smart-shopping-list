import { sub } from 'date-fns';
import {
  getDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { checkIfInactive } from '../utils/utils';
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
    itemsFromList.sort((a, b) => {
      const fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      } else if (fa > fb) {
        return 1;
      } else {
        return 0;
      }
    });

    itemsFromList.sort((a, b) => a.howSoon - b.howSoon);

    const activeItems = [];
    const inactiveItems = [];

    itemsFromList.forEach((item) => {
      if (checkIfInactive(item)) {
        inactiveItems.push(item);
      } else {
        activeItems.push(item);
      }
    });

    const sortedItems = [...activeItems, ...inactiveItems];
    return sortedItems;
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
