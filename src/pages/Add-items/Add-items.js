import React, { useEffect, useRef, useState } from 'react';

import { Modal } from '../../components/modal/Modal';
import { Nav } from '../../components/Nav';
import { addProductToList, getDataOnce } from '../../lib/api';
import { useModalFunctions } from '../../components/modal/ModalFunctions';
import normalizeInputs from '../../components/normalizeInput/NormalizeInputs';
import './Add-items.css';
import { Redirection } from '../../components/Redirection';
import { checkTokenFormat } from '../../utils/utils';

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
  const isValidToken = useRef(checkTokenFormat(product.token));

  //set functions class to modal 'Successfully Product Added Msg'
  const modalProductAdded = useModalFunctions();
  //set functions class to modal 'Duplicated Product Msg'
  const modalDuplicatedProductMsg = useModalFunctions();

  //input focus
  const inputRef = useRef();

  useEffect(() => {
    if (isValidToken.current) {
      inputRef.current.focus();
    }
  });

  const handleChangeProduct = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //update state of Product
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Submit and save data to firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    //get list Products by Token given
    let listProduct = await getDataOnce(token);
    //compare products's name from client side and list products from DB
    let productsListFiltered = listProduct.filter((productByTokenGiven) => {
      const productNameByToken = productByTokenGiven.name;
      const inputFirstCase = normalizeInputs(productNameByToken);
      const inputSecondCase = normalizeInputs(product.name);
      return inputFirstCase === inputSecondCase;
    });
    if (productsListFiltered.length !== 0) {
      modalDuplicatedProductMsg.showModal();
    } else {
      addProductToList(product);
      setProduct({ ...product, name: '', lastPurch: null });
      modalProductAdded.showModal();
    }
  };

  if (!isValidToken.current) {
    return <Redirection />;
  }

  return (
    <>
      <h1>Smart Shopping List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p>Product:</p>
          <input
            required
            id="name"
            className="inputField"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChangeProduct}
            ref={inputRef}
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
        modalClass={modalDuplicatedProductMsg.modalClass}
        handleClose={modalDuplicatedProductMsg.hideModal}
      />
      <Modal
        children={'Your product was successfully added'}
        modalClass={modalProductAdded.modalClass}
        handleClose={modalProductAdded.hideModal}
      />
      <Nav />
    </>
  );
};
