import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePurchaseTimeDB } from '../lib/api';
import { validateHours } from '../utils/utils';

export const ProductForList = ({ item, handleDeleteAttempt, token }) => {
  const [isBought, setIsBought] = useState(false);

  const handleCheck = () => {
    setIsBought(true);
    updatePurchaseTimeDB(token, item, isBought);
  };

  useEffect(() => {
    setIsBought(validateHours(item, 24));
  }, []);

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
        disabled={isBought}
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
