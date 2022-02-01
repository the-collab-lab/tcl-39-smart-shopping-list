import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { getListFromDB } from '../../lib/api';

import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';
import { ProductForList } from '../../components/ProductForList';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [bought, setBought] = useState(true);
  const list = useRef({});
  const token = useRef(localStorage.getItem('token'));

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const unsubscribe = onSnapshot(getListFromDB(token.current), (doc) => {
        list.current = doc.data();
        setItems(doc.data().items);
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  const handleCheck = (e) => {
    setBought(!bought);
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
            handleCheck={handleCheck}
            handleDeleteAttempt={handleDeleteAttempt}
          />
        ))}
      <Outlet />
      <Nav />
    </main>
  );
}

export default ListProducts;
