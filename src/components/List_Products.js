import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../lib/firebase';
import { saveItem } from '../lib/api';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  /* Get items */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Products'), (snapshot) => {
      let products = [];

      snapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });

      setItems(products);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /* Save Item */
  const saveItemName = async (e) => {
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
      {items &&
        items.map((item) => <div key={item.id}> Products: {item.item} </div>)}
    </>
  );
}

export default ListProducts;
