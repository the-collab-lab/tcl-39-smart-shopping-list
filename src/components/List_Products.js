import React, { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { getListFromDB, saveItem } from '../lib/api';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const list = useRef({});
  const token = '13';

  /* Get items */
  useEffect(() => {
    const unsubscribe = onSnapshot(getListFromDB(token), (doc) => {
      list.current = doc.data();
      console.log(doc.data());
      setItems(doc.data().items);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  return (
    <>
      <form>
        <label htmlFor="filter">Filter items</label>
        <br />
        <input
          id="filter"
          value={itemName}
          type="text"
          onChange={handleChange}
          placeholder="Start typing a product..."
        />
        <button type="submit">Save</button>
      </form>
      <h4>This is {list.current.name}'s list</h4>
      {items.map((item, index) => (
        <div key={`${index}${item.name}`}> Products: {item.name} </div>
      ))}
    </>
  );
}

export default ListProducts;
