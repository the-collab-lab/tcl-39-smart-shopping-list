import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../../components/modal/Modal';
import { addProductToList, getListFromDB } from '../../lib/api';
import { onSnapshot } from 'firebase/firestore';
import './Add-items.css';

export const AddItems = () => {
  const [product, setProduct] = useState({
    token: localStorage.getItem('token'),
    name: '',
    howSoon: '7',
    lastPurch: null,
  });

  //set state class to modal
  const [modalClass, setmodalClass] = useState(false);
  const showModal = () => {
    setmodalClass(true);
  };
  const hideModal = () => {
    setmodalClass(false);
  };
  //set state class modal duplicated product
  const [mssgProductDuplicated, setMssgProductDuplicated] = useState(false);
  //set state product list by token
  const [productListByToken, setProductListByToken] = useState([]);
  const list = useRef({});

  //modal hidden function modal
  const showModalMssgProductDuplicated = () => {
    setMssgProductDuplicated(true);
    console.log('Modal was showed');
  };
  const hideModalMssgProductDuplicated = () => {
    setMssgProductDuplicated(false);
    console.log('Modal was hidden');
  };

  //Handle state Product
  const handleChangeProduct = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //update state of Product
    setProduct({
      ...product,
      [name]: value,
    });
  };
  console.log(product, 'product');
  getListFromDB(product.token);
  useEffect(() => {
    /* Get token */

    /* Get items */
    const unsubscribe = onSnapshot(
      getListFromDB(localStorage.getItem('token')),
      (doc) => {
        list.current = doc.data();
        const listProductbyToken = list.current.items;
        setProductListByToken(listProductbyToken);
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(productListByToken, 'productListByToken');
  const compareObjectProduct = () => {
    productListByToken.map((productArray) => {
      const objeto = {
        howSoon: 7,
        lastPurch: null,
        name: 'arroz',
        token: 'offer octet pabst',
      };
      return console.log(objeto === productArray);
      // if (productArray === product) {
      //   return console.log('Este producto esta repetido')
      // } else {
      //   return console.log('Este producto no esta repetido')
      // }
    });
  };

  // Submit and save data to firestore
  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToList(product);
    setProduct({ ...product, name: '', lastPurch: null });
    showModal();
  };

  //function evitar productos duplicados

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
          <button type="submit" onClick={compareObjectProduct}>
            Submit
          </button>
        </div>
      </form>
      <Modal
        children={'This product is duplicated'}
        modalClass={mssgProductDuplicated}
        handleClose={hideModalMssgProductDuplicated}
      />
      <Modal
        children={'Your product was succesfully added'}
        modalClass={modalClass}
        handleClose={hideModal}
      />
    </main>
  );
};
