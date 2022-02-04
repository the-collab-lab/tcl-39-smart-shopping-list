import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

import { getListFromDB } from '../../lib/api';

import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';
import { ProductForList } from '../../components/ProductForList';
import { getTokenFromStorage } from '../../utils/utils';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const list = useRef({});
  const token = useRef(getTokenFromStorage());

  useEffect(() => {
    if (token.current) {
      /* Get items */

      const getItemsFromList = async () => {
        const docRef = getListFromDB(token.current);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const products = docSnap.data().items;
          if (products !== undefined) {
            setItems(products);
            return;
          }
          return [];
        }
      };
      getItemsFromList();
    }
  }, []);

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDeleteAttempt = () => {
    if (window.confirm('Do you want to delete this product?')) {
      alert('Deleted!');
    }
  };

  if (!token.current) return <Redirection />;

  return (
    <main>
      <h1>List</h1>
      <form>
        <label htmlFor="filter">Filter items</label>
        <br />
        <input
          id="filter"
          className="inputField"
          value={itemName}
          type="text"
          onChange={handleChange}
          placeholder="Start typing a product..."
        />
      </form>
      <h4 className="list-name">
        {list.current.name && `${list.current.name}'s list`}
      </h4>
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
      <Nav />
    </main>
  );
}

export default ListProducts;
