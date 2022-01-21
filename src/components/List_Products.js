import React, { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { getListFromDB } from '../lib/api';
import { Link, Outlet } from 'react-router-dom';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const list = useRef({});

  useEffect(() => {
    /* Get token */
    const token = localStorage.getItem('token');

    /* Get items */
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

  const handleDeleteAttempt = () => {
    if (window.confirm('Do you want to delete this product?')) {
      alert('Deleted!');
    }
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
      </form>
      <h4>{list.current.name && `${list.current.name}'s list`}</h4>
      {items &&
        items.map((item, index) => (
          <div
            key={`${index}${item.name}`}
            aria-label={`${
              item.howSoon === 7
                ? 'soon'
                : item.howSoon === 14
                ? 'kind of soon'
                : 'not soon'
            }`}
          >
            <p>Product: {item.name}</p>
            <Link to={`/list/${item.name}/`} state={{ product: item }}>
              <button>details</button>
            </Link>
            <button onClick={handleDeleteAttempt}>delete</button>
          </div>
        ))}
      <Outlet />
    </>
  );
}

export default ListProducts;
