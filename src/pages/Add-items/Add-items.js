import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../../components/modal/Modal';
import { addProductToList, getListFromDB } from '../../lib/api';
import { onSnapshot } from 'firebase/firestore';
import './Add-items.css';

export const AddItems = () => {
  //Normalizar input producto name
  // const productoName = "Pimentónñ $%%%(/&)=!!!!!!!!!n";
  // const productoNameLowerCase = productoName.toLowerCase()
  // const productoNameNormalizado = productoNameLowerCase.normalize("NFD").replace(/[\u0300-\u036f\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, "")
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
  //get list Product by Token
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
  console.log(product.name);

  // Submit and save data to firestore
  const handleSubmit = (e) => {
    e.preventDefault();
    let productCompareResult = productListByToken.filter(
      (productBytoken) => productBytoken.name === product.name,
    );
    console.log(productCompareResult, 'productCompareResult');
    if (productCompareResult.length !== 0) {
      console.log('El producto existe');
      showModalMssgProductDuplicated();
    } else {
      console.log('El producto no existe');
      addProductToList(product);
      setProduct({ ...product, name: '', lastPurch: null });
      showModal();
    }
  };

  // if (stringA.toLowerCase() === stringB.toLowerCase()){
  //     alert("The strings are equal.")
  // } else {
  //     alert("The strings are NOT equal.")
  // }

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
          <button type="submit">Submit</button>
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
