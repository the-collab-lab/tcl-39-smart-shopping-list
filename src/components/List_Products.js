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
      // doc.forEach((doc) => {
      //   products.push({ ...doc.data(), id: doc.id });
      // });

      setItems(doc.data().items);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /* Save Item */
  const saveItemName = (e) => {
    e.preventDefault();
    saveItem(itemName);
    setItemName('');
  };

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  return (
    <>
      <form onSubmit={saveItemName}>
        <input
          value={itemName}
          type="text"
          onChange={handleChange}
          placeholder="Type your product..."
        />
        <button type="submit">Save</button>
      </form>
      <h4>This is {list.current.name}'s list</h4>
      {items.map((item, index) => (
        <div key={`${item.index}${item.name}`}> Products: {item.name} </div>
      ))}
    </>
  );
}

export default ListProducts;
