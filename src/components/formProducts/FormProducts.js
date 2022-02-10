import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getTokenFromStorage } from '../../utils/utils';
import { ProductForList } from '../ProductForList';
import './FormProducts.css';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => setItemName(e.target.value);
  const token = useRef(getTokenFromStorage());

  items = !itemName
    ? items
    : items.filter((filterItem) =>
        filterItem.name.toLowerCase().includes(itemName.toLocaleLowerCase()),
      );

  const resetInput = () => {
    setItemName('');
  };

  const handleDeleteAttempt = () => {
    if (window.confirm('Do you want to delete this product?')) {
      alert('Deleted!');
    }
  };
  return (
    <>
      <form>
        <label htmlFor="filter">Filter items</label>
        <div className="filter_item">
          <input
            id="filter"
            className="inputField"
            value={itemName}
            type="text"
            onChange={handleChange}
            placeholder="Start typing a product..."
          />
          <button
            type="button"
            className="button_filteritem"
            onClick={resetInput}
          >
            x
          </button>
        </div>
      </form>
      {items &&
        items.map((item, index) => (
          <ProductForList
            key={`${index}${item.name}`}
            item={item}
            handleDeleteAttempt={handleDeleteAttempt}
            token={token.current}
          />
        ))}
      <Outlet />
    </>
  );
};

export default FormProducts;
