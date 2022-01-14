import React, { useEffect, useState } from 'react';
import { getItems, saveItem } from '../lib/api';

function ListProducts() {
  const [items, setItems] = useState(null);
  const [itemName, setItemName] = useState('');

  /* Get items */
  useEffect(() => {
    getItemsData();
  }, []);
  const getItemsData = async () => {
    const itm = await getItems();
    setItems(itm.docs);
  };

  /* Save Item */
  const saveItemName = async (e) => {
    e.preventDefault();
    await saveItem(itemName);
    setItemName('');
    getItemsData();
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
        items.map((itm) => (
          <div key={itm.id}> Products: {itm.data().item} </div>
        ))}
    </div>
  );
}

export default ListProducts;
