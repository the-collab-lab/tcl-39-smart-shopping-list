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

      console.log(products);
      setItems(products);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  /* Save Item */
  const saveItemName = async (e) => {
    e.preventDefault();
    saveItem(itemName);
    setItemName('');
  };

  return (
    <div>
      <form onSubmit={saveItemName}>
        <input
          value={itemName}
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Type your product..."
        />
        <button type="submit">Save</button>
      </form>
      {items &&
        items.map((item) => <div key={item.id}> Products: {item.item} </div>)}
    </div>
  );
}

export default ListProducts;
