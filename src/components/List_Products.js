import React, { useEffect, useState } from 'react';
import { getItems, saveItem } from '../lib/api';

function ListProducts() {
  const [Items, setItems] = useState(null);
  const [ItemName, setItemName] = useState(null);

  /* Get Items */
  useEffect(() => {
    getItemsData();
  }, []);
  const getItemsData = async () => {
    const Itm = await getItems();
    setItems(Itm.docs);
  };

  /* Save Item */
  const saveItemName = async (e) => {
    e.preventDefault();
    await saveItem(ItemName);
    setItemName('');
    getItemsData();
  };

  return (
    <div>
      <form onSubmit={saveItemName}>
        <input
          value={ItemName}
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Save</button>
      </form>
      {Items &&
        Items.map((Itm) => (
          <div key={Itm.id}> Products: {Itm.data().item} </div>
        ))}
    </div>
  );
}

export default ListProducts;
