import { compareAsc, sub } from 'date-fns';
import { getDoc } from 'firebase/firestore';
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

  const handleCheck = async (e) => {
    console.log(token);
    const listCollection = getListFromDB(token);
    const list = await getDoc(listCollection);
    if (list.exists()) {
      console.log('Document data:', list.data());
      const itemsFromList = list.data().items;
      const currentItem = itemsFromList.filter((itemToCheck) => {
        return itemToCheck.name === item.name;
      });

      console.log(currentItem);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    setIsBought(!isBought);
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
        <Link to={`/listCollection/${item.name}/`} state={{ product: item }}>
          <button>details</button>
        </Link>
        <button onClick={handleDeleteAttempt}>delete</button>
      </div>
    </div>
  );
};
