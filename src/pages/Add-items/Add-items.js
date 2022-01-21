import React, { useEffect, useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { addProductToList } from '../../lib/api';
import { deleteAll } from '../../lib/populateDB';
import './Add-items.css';

export const AddItems = () => {
  const [product, setProduct] = useState({
    token: '',
    name: '',
    howSoon: '7',
    lastPurch: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setProduct({ ...product, token });
    console.log(product);
  }, []);

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
    const value = e.target.value;
    const name = e.target.name;
    //update state of Product
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Submit data to firestore
  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToList(product);
    setProduct({ ...product, name: '', howSoon: '7', lastPurch: null });
    showModal();
  };

  return (
    <main>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Product:</p>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChangeProduct}
          />
        </label>
        <fieldset>
          <p>How soon will you buy this again?</p>
          <div>
            <label htmlFor="soon">
              <input
                defaultChecked
                id="soon"
                type="radio"
                name="howSoon"
                required
                value={7}
                onChange={handleChangeProduct}
              />
              Soon
            </label>
          </div>
          <div>
            <label htmlFor="kindOfSoon">
              <input
                id="kindOfSoon"
                type="radio"
                name="howSoon"
                required
                value={14}
                onChange={handleChangeProduct}
              />
              Kind of soon
            </label>
          </div>
          <div>
            <label htmlFor="notSoon">
              <input
                id="notSoon"
                type="radio"
                name="howSoon"
                required
                value={30}
                onChange={handleChangeProduct}
              />
              Not soon
            </label>
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
