import React, { useEffect, useRef, useState } from 'react';
import { getDocs, onSnapshot } from 'firebase/firestore';

import { getListFromDB, listsCollection } from '../lib/api';
import { Link, Outlet } from 'react-router-dom';

const fakeSetToken = async () => {
  //Esta función es solo para simular que ya se tiene un token guardado en localStorage.
  let tokens = [];
  const docs = await getDocs(listsCollection);
  docs.forEach((doc) => {
    tokens.push(doc.id);
  });
  const token = tokens[Math.floor(Math.random() * tokens.length)];
  localStorage.setItem('token', token);
};

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const list = useRef({});

  /* Get items */
  useEffect(() => {
    fakeSetToken(); //Para demostración solamente. Borrar antes de hacer merge con Issue 3.
    const token = localStorage.getItem('token');
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
    if (window.confirm('Press a button!')) {
      console.log('Deleted!');
    } else {
      console.log('Not deleted.');
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
        <button type="submit">Save</button>
      </form>
      <h4>This is {list.current.name}'s list</h4>
      {items.map((item, index) => (
        <div
          key={`${index}${item.name}`}
          aria-label={`${
            item.howSoon === 7
              ? 'soon'
              : item.howSoon === 14
              ? 'kind of soon'
              : 'not very soon'
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
