import React, { useState, useRef } from 'react';
import { addProductToList, getDataOnce } from '../../lib/api';
import { Modal } from '../../components/modal/Modal';
import {
  useModalFunctions,
  useModalFunctionsMssgDuplicatedProduct,
} from '../../components/modal/ModalFunctions';
import normalizeInputs from '../../components/normalizeInput/NormalizeInputs';
import './Add-items.css';

export const AddItems = () => {
  //get token from localstore
  const token = localStorage.getItem('token');
  //set state of product items from client side
  const [product, setProduct] = useState({
    token,
    name: '',
    howSoon: '7',
    lastPurch: null,
  });

  //set state class to modal 'Successfully Product Added Msg'
  const { modalClass, showModal, hideModal } = useModalFunctions();

  //set state class to modal 'Duplicated Product Msg'
  const {
    msgProductDuplicatedModal,
    showModalMssgProductDuplicated,
    hideModalMssgProductDuplicated,
  } = useModalFunctionsMssgDuplicatedProduct();

  //Handle state Product from client side
  const handleChangeProduct = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //update state of Product
    setProduct({
      ...product,
      [name]: value,
    });
  };
  //set list useRef products list by token given
  const list = useRef([]);
  let listProduct = [];

  //get list Products by Token given
  getDataOnce(token, list);
  listProduct = list.current;

  // Submit and save data to firestore
  const handleSubmit = (e) => {
    e.preventDefault();
    //compare products's name from client side and list products from DB
    let productsListFiltered = listProduct.filter((productByTokenGiven) => {
      const productNameByToken = productByTokenGiven.name;
      const inputFirstCase = normalizeInputs(productNameByToken);
      const inputSecondCase = normalizeInputs(product.name);
      return inputFirstCase === inputSecondCase;
    });
    if (productsListFiltered.length !== 0) {
      showModalMssgProductDuplicated();
    } else {
      addProductToList(product);
      setProduct({ ...product, name: '', lastPurch: null });
      showModal();
    }
  };

  return (
    <main>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Product:</p>
          <input
            required
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
        children={'This product is duplicated'}
        modalClass={msgProductDuplicatedModal}
        handleClose={hideModalMssgProductDuplicated}
      />
      <Modal
        children={'Your product was successfully added'}
        modalClass={modalClass}
        handleClose={hideModal}
      />
    </main>
  );
};
