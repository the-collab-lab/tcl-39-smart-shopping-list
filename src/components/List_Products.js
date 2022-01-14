import React, { useEffect, useState } from 'react';
import { getItems, saveItem } from '../lib/api';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function ListProducts() {
  const [items, setItems] = useState(null);
  const [itemName, setItemName] = useState('');

  /* Get items */
  useEffect(() => {
    // getItemsData();

    // realtime collection data
    onSnapshot(collection(db, 'Products'), (snapshot) => {
      let products = [];
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      console.log(products);
      setItems(products);
    });
  }, []);

  // const getItemsData = async () => {
  //   const itms = await getItems();
  //   console.log(itms.docs);
  //   setItems(itms.docs);
  // };

  /* Save Item */
  const saveItemName = async (e) => {
    e.preventDefault();
    saveItem(itemName);
    setItemName('');
    // getItemsData();
  };

  return (
    <div>
      <form onSubmit={saveItemName}>
        <input
          value={itemName}
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Save</button>
      </form>
      {items &&
        items.map((itm) => <div key={itm.id}> Products: {itm.item} </div>)}
    </div>
  );
}

export default ListProducts;
