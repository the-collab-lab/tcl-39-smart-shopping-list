import React, { useEffect, useRef, useState } from 'react';
import { addProductToList, getItemsFromList } from '../../lib/api';
import { Modal } from '../../components/modal/Modal';
import { Nav } from '../../components/Nav';
import { useModalFunctions } from '../../components/modal/ModalFunctions';
import normalizeInputs from '../../components/normalizeInput/NormalizeInputs';
import { Redirection } from '../../components/redirection/Redirection';
import { checkTokenFormat, getTokenFromStorage } from '../../utils/utils';
import './Add-items.css';
import '../../components/button/button.css';
import '../../components/formProducts/FormProducts.css';

export const AddItems = () => {
  //get token from localstore
  const token = getTokenFromStorage();
  //set state of product items from client side
  const [product, setProduct] = useState({
    token,
    name: '',
    howSoon: '7',
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
    let listProduct = await getItemsFromList(token);
    //compare products's name from client side and list products from DB
    if (listProduct) {
      let productsListFiltered = listProduct.filter((productByTokenGiven) => {
        const productNameByToken = productByTokenGiven.name;
        const inputFirstCase = normalizeInputs(productNameByToken);
        const inputSecondCase = normalizeInputs(product.name);
        return inputFirstCase === inputSecondCase;
      });

      if (productsListFiltered.length !== 0) {
        modalDuplicatedProductMsg.showModal();
        return;
      }
    }
    addProductToList(product);
    setProduct({
      ...product,
      name: '',
      howSoon: '7',
    });
    modalProductAdded.showModal();
  };

  if (!isValidToken.current) {
    return <Redirection />;
  }

  return (
    <>
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="list-header">
          <label htmlFor="name">
            Add new products to your list:
            <div className="filter-item inputField">
              <input
                required
                id="name"
                className="filter-input"
                type="text"
                name="name"
                value={product.name}
                onChange={handleChangeProduct}
                ref={inputRef}
                placeholder="New product"
              />
            </div>
          </label>

          <p className="how-soon">How soon will you buy this again?</p>
          <fieldset>
            <div>
              <label htmlFor="soon">
                <input
                  id="soon"
                  type="radio"
                  name="howSoon"
                  required
                  value="7"
                  checked={product.howSoon === '7'}
                  onChange={handleChangeProduct}
                />
                Weekly
              </label>
            </div>
            <div>
              <label htmlFor="kindOfSoon">
                <input
                  id="kindOfSoon"
                  type="radio"
                  name="howSoon"
                  required
                  value="14"
                  checked={product.howSoon === '14'}
                  onChange={handleChangeProduct}
                />
                Biweekly
              </label>
            </div>
            <div>
              <label htmlFor="notSoon">
                <input
                  id="notSoon"
                  type="radio"
                  name="howSoon"
                  required
                  value="30"
                  checked={product.howSoon === '30'}
                  onChange={handleChangeProduct}
                />
                Monthly
              </label>
            </div>
          </fieldset>
        </div>
        <div className="button-container">
          <button className="button-container" type="submit">
            Submit
          </button>
        </div>
      </form>

      <Modal
        children={'Your product already exists'}
        modalClass={modalDuplicatedProductMsg.modalClass}
        handleClose={modalDuplicatedProductMsg.hideModal}
        iconMaterial={'error'}
        colorIcon={'md-light_error'}
      />
      <Modal
        children={'Your product was successfully added'}
        modalClass={modalProductAdded.modalClass}
        handleClose={modalProductAdded.hideModal}
        iconMaterial={'check_circle'}
        colorIcon={'md-light_success'}
      ></Modal>

      <Nav />
    </>
  );
};
