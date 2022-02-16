import React, { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getTokenFromStorage } from '../../utils/utils';
import { ProductForList } from '../ProductForList';
import './FormProducts.css';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => setItemName(e.target.value);
  const token = useRef(getTokenFromStorage());
  const [itemsFiltered, setItemsFiltered] = useState([items]);

  useEffect(() => {
    if (itemName === '') {
      setItemsFiltered(items);
    } else {
      setItemsFiltered(
        items.filter((filterItem) =>
          filterItem.name.toLowerCase().includes(itemName.toLocaleLowerCase()),
        ),
      );
    }
  }, [itemName, items]);

  const resetInput = () => setItemName('');

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
      {itemsFiltered?.length > 0 ? (
        itemsFiltered.map((item, index) => (
          <ProductForList
            key={`${index}${item.name}`}
            item={item}
            handleDeleteAttempt={handleDeleteAttempt}
            token={token.current}
          />
        ))
      ) : (
        <p>
          No results. There isn't any product with '{itemName}' as the name in
          the database.
        </p>
      )}
      <Outlet />
    </>
  );
};

export default FormProducts;
