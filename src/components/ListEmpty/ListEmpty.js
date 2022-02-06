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
    <>
      <p>Your shopping list is currently empty</p>
      <button onClick={routeChange} className="link-button">
        Add Item
      </button>
    </>
  );
};

export default ListEmpty;
