import { compareAsc, sub } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePurchaseTimeDB } from '../lib/api';

export const ProductForList = ({ item, handleDeleteAttempt, token }) => {
  function getDateDiff() {
    if (!item.lastPurch) return false;

    //Dates
    const currentTime = new Date();
    const purchaseDate = item.lastPurch.toDate();
    const oneDayAgo = sub(currentTime, {
      days: 1,
    });

    const boughtLast24h = compareAsc(purchaseDate, oneDayAgo);

    if (boughtLast24h === -1) {
      return false;
    }

    return true;
  }

  //Lazy state initialization
  const [isBought, setIsBought] = useState(getDateDiff);

  const handleCheck = async () => {
    setIsBought(!isBought);
    updatePurchaseTimeDB(token, item, isBought);
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
