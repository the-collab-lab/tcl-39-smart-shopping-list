import React, { useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { deleteAll } from '../../lib/populateDB';
import './Add-items.css';

export const AddItems = () => {
  deleteAll();
  //Get token from localStorage
  const getToken = localStorage.getItem('tokenList');

  //set hooks for store state of item added
  const [product, setProduct] = useState({
    rubro: '',
    time: null,
    token: getToken,
    lastDateBuy: null,
  });
  console.log(product);
  //set state class to modal
  const [modalClass, setmodalClass] = useState(false);
  const showModal = () => {
    setmodalClass(true);
  };
  const hideModal = () => {
    setmodalClass(false);
  };

  //Handle state Product
  const handleChangeProduct = (e) => {
    //store target for each input
    const target = e.target;
    const value = target.value;
    const name = target.name;
    //update state of Product
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Submit data to firestore
  const handleSubmit = (event) => {
    event.preventDefault();
    setProduct({
      rubro: '',
      time: null,
      token: getToken,
      lastDateBuy: null,
    });
    showModal();
  };

  return (
    <main>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rubro">
          <p>Product:</p>
          <input
            type="text"
            name="rubro"
            value={product.rubro}
            onChange={handleChangeProduct}
          />
        </label>
        <fieldset>
          <p>Que tan pronto lo vas a comprar?</p>
          <div>
            <label htmlFor="time">"Pronto"</label>
            <input
              type="radio"
              name="time"
              required
              value={7}
              onChange={handleChangeProduct}
            />
            <label htmlFor="time">"Mas o menos pronto"</label>
            <input
              type="radio"
              name="time"
              required
              value={14}
              onChange={handleChangeProduct}
            />
            <label htmlFor="time">"Mas tarde"</label>
            <input
              type="radio"
              name="time"
              required
              value={30}
              onChange={handleChangeProduct}
            />
          </div>
        </fieldset>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Modal
        children={'Your product was succesfully added'}
        modalClass={modalClass}
        handleClose={hideModal}
      />
    </main>
  );
};
