import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { getListFromDB } from '../../lib/api';

import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
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
          <div
            key={`${index}${item.name}`}
            className="product-container"
            aria-label={`${
              item.howSoon === 7
                ? 'soon'
                : item.howSoon === 14
                ? 'kind of soon'
                : 'not soon'
            }`}
          >
            <p>
              Product: <span className="item-name">{item.name}</span>
            </p>
            <div className="btn-container">
              <Link to={`/list/${item.name}/`} state={{ product: item }}>
                <button>details</button>
              </Link>
              <button onClick={handleDeleteAttempt}>delete</button>
            </div>
          </div>
        ))}
      <Outlet />
      <Nav />
    </main>
  );
}

export default ListProducts;