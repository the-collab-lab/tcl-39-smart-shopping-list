import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils/dist/calculateEstimate';
import { updatePurchaseTimeDB, getItemsFromList } from '../lib/api';
import { calculateDaysSinceLastPurchase, validateHours } from '../utils/utils';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const ProductForList = ({ item, token }) => {
  const [isBought, setIsBought] = useState(false);
  // console.log(token, item)

  const handleDeleteAttempt = async (e) => {
    if (window.confirm('Do you want to delete this product?')) {
      const name = e.target.getAttribute('name');
      const itemtoDelete = await getItemsFromList(token);
      const itemFinded = itemtoDelete.find((item) => item.name === name);
      const washingtonRef = doc(db, 'lists', token);
      // Atomically remove a region from the "regions" array field.
      await updateDoc(washingtonRef, {
        items: arrayRemove(itemFinded),
      });
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
  }, []);

  return (
    <div
      name={item.name}
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
        <button onClick={handleDeleteAttempt} name={item.name}>
          delete
        </button>
      </div>
    </div>
  );
};
