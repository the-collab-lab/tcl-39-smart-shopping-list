import React, { useState } from 'react';
import './Add-items.css';

export const AddItems = () => {
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
  };

  //List of input type radio to render at page
  const radioInputList = [
    { timeName: 'Pronto', value: 7 },
    { timeName: 'Mas o menos pronto', value: 14 },
    { timeName: 'Mas tarde', value: 30 },
  ];

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
          <label htmlFor="time">
            <p>Que tan pronto lo vas a comprar?</p>
            {radioInputList.map((radioInput, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="time"
                  value={radioInput.value}
                  onChange={handleChangeProduct}
                />
                <span>{radioInput.timeName}</span>
              </div>
            ))}
          </label>
        </fieldset>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};
