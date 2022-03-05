import { useEffect, useState } from 'react';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils/dist/calculateEstimate';
import { updatePurchaseTimeDB, getItemsFromList } from '../../lib/api';
import { calculateDaysSinceLastPurchase, validateHours } from '../../utils/utils';
import { deleteItem } from '../../lib/api';
import './ProductForList.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const ProductForList = ({ item, token }) => {
  const [isBought, setIsBought] = useState(false);

  const handleDelete = async (e) => {
    if (window.confirm('Do you want to delete this product?')) {
      const name = e.target.getAttribute('name');
      const itemsFromList = await getItemsFromList(token);
      const itemToDelete = itemsFromList.find((item) => item.name === name);

      await deleteItem(token, itemToDelete);
       
      alert('Deleted!');
    }
  };

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
  }, [item]);

  return (
    <div className="product-container">
      <div
        className="color-mark"
        aria-label={`${
          item.howSoon === 7
            ? 'soon'
            : item.howSoon === 14
            ? 'kind of soon'
            : 'not soon'
        }`}
      />
      <div className="main-elements-container">
        <CheckCircleIcon
          className={isBought ? 'checked' : 'unchecked'}
          onClick={handleCheck}
        />
        <div className="name-container">
          <span className="item-name">
            {item.name.length < 11
              ? item.name
              : `${item.name.substring(0, 10)}...`}
          </span>
        </div>
        <button
          onClick={handleDelete}
          name={item.name}
          className="button_delete"
        >
          <span className="material-icons md-14"  name={item.name}>delete</span>
        </button>

      </div>
    </div>
  );
};
