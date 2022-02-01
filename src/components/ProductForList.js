import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProductForList = ({ item, handleDeleteAttempt }) => {
  const [isBought, setIsBought] = useState(false);

  const handleCheck = (e) => {
    setIsBought(!isBought);
  };

  const getDateDiff = () => {
    if (!item.lastPurch) return;

    const now = new Date();
    console.log(now);
    console.log(typeof now);
    console.log(now instanceof Date);
    console.log(item.lastPurch);
    console.log(typeof item.lastPurch);
    console.log(item.lastPurch instanceof Date);

    const purchaseDate = new Date('February 1 2021 10:30');
    //calculate total number of seconds between two dates
    const totalSeconds = Math.abs(now - purchaseDate) / 1000;
    const daysDifference = Math.floor(totalSeconds / (60 * 60 * 24));
    console.log(daysDifference);
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
        <button onClick={getDateDiff}>Date</button>
      </div>
    </div>
  );
};
