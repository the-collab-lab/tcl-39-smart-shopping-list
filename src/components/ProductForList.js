import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePurchaseTimeDB } from '../lib/api';
import { getDateDiff } from '../utils/utils';

export const ProductForList = ({ item, handleDeleteAttempt, token }) => {
  //Lazy state initialization
  const calculateLazyState = () => {
    return getDateDiff(item);
  };
  const [isBought, setIsBought] = useState(calculateLazyState);

  const handleCheck = () => {
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
