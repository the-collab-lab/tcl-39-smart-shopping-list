import React from 'react';
import { Link } from 'react-router-dom';
import './ListEmpty.css';

const ListEmpty = () => {
  return (
    <>
      <h1>Smart Shopping List</h1>
      <p>Your shopping list is currently empty</p>
      <button>
        <Link className="link-button" to="/add-items">
          Add Item
        </Link>
      </button>
    </>
  );
};

export default ListEmpty;
