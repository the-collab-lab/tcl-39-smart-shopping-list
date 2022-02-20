import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils/dist/calculateEstimate';
import { updatePurchaseTimeDB } from '../lib/api';
import {
  calculateDaysSinceLastPurchase,
  setProductStatus,
  validateActive,
  validateHours,
} from '../utils/utils';

export const ProductForList = ({ item, handleDeleteAttempt, token }) => {
  const [isBought, setIsBought] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const handleCheck = () => {
    setIsBought(true);

    let { totalPurchases, lastPurchase, howSoon } = item;

    const daysSinceLastTransaction =
      calculateDaysSinceLastPurchase(lastPurchase);

    const newEstimateToNextPurchase = calculateEstimate(
      howSoon,
      daysSinceLastTransaction,
      totalPurchases,
    );

    updatePurchaseTimeDB(token, item, isBought, newEstimateToNextPurchase);
  };

  useEffect(() => {
    setIsBought(validateHours(item, 24));
    setIsInactive(validateActive(item));
  }, [item]);

  return (
    <div
      className="product-container"
      aria-label={setProductStatus(isInactive, item.howSoon)}
    >
      <input
        type="checkbox"
        value="Bought"
        checked={isBought}
        disabled={isBought}
        onChange={handleCheck}
      />
      <p>
        <span>Product: </span>
        <span aria-labelledby={item.name} className="item-name">
          {item.name}
        </span>
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
