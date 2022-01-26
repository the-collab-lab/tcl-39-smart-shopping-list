import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { getListFromDB } from '../lib/api';

import './ListProducts.css';
import { Redirection } from './Redirection';

function ListProducts() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const list = useRef({});
  const navigate = useNavigate();

  /* Get token */
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.log('no hay token en List');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } else {
      /* Get items */
      const unsubscribe = onSnapshot(getListFromDB(token), (doc) => {
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

  if (!token) {
    return <Redirection />;
  }

  return (
    <>
      <h1>List</h1>
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
    </>
  );
}

export default ListProducts;
