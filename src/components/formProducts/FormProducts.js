import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getTokenFromStorage } from '../../utils/utils';
import { ProductForList } from '../ProductForList';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => setItemName(e.target.value);
  const token = useRef(getTokenFromStorage());

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
      </form>
      {items &&
        items.map((item, index) => (
          <ProductForList
            key={`${index}${item.name}`}
            name={item.name}
            item={item}
            token={token.current}
          />
        ))}
      <Outlet />
    </>
  );
};

export default FormProducts;
