import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const FormProducts = ({ list, items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDeleteAttempt = () => {
    if (window.confirm('Do you want to delete this product?')) {
      alert('Deleted!');
    }
  };
  return (
    <>
      <form>
        <label htmlFor="filter">Filter items</label>
        <br />
        <input
          id="filter"
          className="inputField"
          value={itemName}
          type="text"
          onChange={handleChange}
          placeholder="Start typing a product..."
        />
      </form>
      <h4 className="list-name">
        {list.current.name && `${list.current.name}'s list`}
      </h4>
      {items &&
        items.map((item, index) => (
          <div
            key={`${index}${item.name}`}
            className="product-container"
            aria-label={`${
              item.howSoon === 7
                ? 'soon'
                : item.howSoon === 14
                ? 'kind of soon'
                : 'not soon'
            }`}
          >
            <p>
              Product: <span className="item-name">{item.name}</span>
            </p>
            <div className="btn-container">
              <Link to={`/list/${item.name}/`} state={{ product: item }}>
                <button>details</button>
              </Link>
              <button onClick={handleDeleteAttempt}>delete</button>
            </div>
          </div>
        ))}
      <Outlet />
    </>
  );
};

export default FormProducts;
