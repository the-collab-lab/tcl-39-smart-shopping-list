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
      <h1>List empty</h1>
      <button onClick={routeChange}>Add Item</button>
    </>
  );
};

export default ListEmpty;
