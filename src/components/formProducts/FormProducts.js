import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getTokenFromStorage } from '../../utils/utils';
import { ProductForList } from '../ProductForList';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => setItemName(e.target.value);
  const token = useRef(getTokenFromStorage());

  items = !itemName
    ? items
    : items.filter((person) =>
        person.name.toLowerCase().includes(itemName.toLocaleLowerCase()),
      );

  const handleDeleteAttempt = () => {
    if (window.confirm('Do you want to delete this product?')) {
      alert('Deleted!');
    }
  };
  return (
    <>
      <form>
        <label htmlFor="filter">Filter items</label>
        <input
          id="filter"
          className="inputField"
          value={itemName}
          type="text"
          onChange={handleChange}
          placeholder="Start typing a product..."
        />
        <button onClick={() => setItemName(() => '')}>Reset</button>
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
