import { compareAsc, sub } from 'date-fns';
import {
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getListFromDB } from '../lib/api';

export const ProductForList = ({ item, handleDeleteAttempt, token }) => {
  const getDateDiff = () => {
    if (!item.lastPurch) return;

    //Dates
    const currentTime = new Date();
    const purchaseDate = item.lastPurch.toDate();
    const oneDayAgo = sub(currentTime, {
      days: 1,
    });

    const result = compareAsc(purchaseDate, oneDayAgo);
    if (result === -1) {
      return false;
    }
    return true;
  };

  const [isBought, setIsBought] = useState(getDateDiff());

  const updatePurchaseTimeDB = async () => {
    //Encuentra la lista.
    const listCollection = getListFromDB(token);
    const list = await getDoc(listCollection);

    if (list.exists()) {
      const itemsFromList = list.data().items;

      //Encuentra el item a actualizar.
      const thisItem = itemsFromList.find((itemToCheck) => {
        return itemToCheck.name === item.name;
      });

      const listRef = doc(db, 'lists', token);
      const thisItemUpdated = { ...thisItem, lastPurch: new Date() };
      await updateDoc(listRef, { items: arrayUnion(thisItemUpdated) });
      await updateDoc(listRef, { items: arrayRemove(thisItem) });
    }
  };

  // const updateItem = async (foundItem) => {
  //   const listRef = doc(db, 'lists', token);
  //   const thisItemUpdated = { ...foundItem, lastPurch: new Date() };
  //   await updateDoc(listRef, { items: arrayUnion(thisItemUpdated) });
  //   await updateDoc(listRef, { items: arrayRemove(foundItem) });

  //   console.log(thisItemUpdated);
  // };

  const handleCheck = async () => {
    //Si se desmarca, no actualiza la DB.
    if (isBought) {
      setIsBought(!isBought);
      return;
    }
    //Si se marca:
    //Lo refleja en el checkbox
    setIsBought(!isBought);
    updatePurchaseTimeDB();
  };

  return (
    <div
      className="product-container"
      aria-label={`${
        item.howSoon === 7
          ? 'soon'
          : item.howSoon === 14
          ? 'kind of soon'
          : 'not soon'
      }`}
    >
      <input
        type="checkbox"
        value="Bought"
        checked={isBought}
        onChange={handleCheck}
      />
      <p>
        Product: <span className="item-name">{item.name}</span>
      </p>
      <div className="btn-container">
        <Link to={`/list/${item.name}/`} state={{ product: item }}>
          <button>details</button>
        </Link>
        <button onClick={handleDeleteAttempt}>delete</button>
      </div>
    </div>
  );
};
