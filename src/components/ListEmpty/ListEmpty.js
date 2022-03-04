import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListEmpty.css';

const ListEmpty = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/add-items';
    navigate(path);
  };

  return (
    <main className='empty_list-container'>
      <p>Your shopping list is currently empty</p>
      <button aria-label="add-item" onClick={routeChange} className="button-container">
        Add Item
      </button>
    </main>
  );
};

export default ListEmpty;
