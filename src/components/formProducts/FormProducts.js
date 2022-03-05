import React, { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getTokenFromStorage } from '../../utils/utils';
import './FormProducts.css';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ProductForList } from './../productForList/ProductForList';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => {
    setItemName(e.target.value);
    setIsFiltering(true);

    if (e.target.value === '') {
      setIsFiltering(false);
    }
  };

  const token = useRef(getTokenFromStorage());
  const [itemsFiltered, setItemsFiltered] = useState(items);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (itemName === '') {
      setItemsFiltered(items);
    } else {
      setItemsFiltered(
        items.filter((filterItem) =>
          filterItem.name.toLowerCase().includes(itemName.toLocaleLowerCase()),
        ),
      );
    }
  }, [itemName, items]);

  const resetInput = () => {
    setItemName('');
    setIsFiltering(false);
  };

  return (
    <>
      <div className="list-header">
        <h1 className="title">HELLO!</h1>
        <form className="filter-form">
          <label htmlFor="filter">Filter your shopping list.</label>
          <div className="filter-item">
            <input
              id="filter"
              className="filter-input"
              value={itemName}
              type="text"
              onChange={handleChange}
              placeholder="SEARCH"
            />
            {isFiltering ? (
              <HighlightOffIcon onClick={resetInput} />
            ) : (
              <SearchIcon />
            )}
          </div>
        </form>
      </div>
      <div className="products-container">
        {itemsFiltered?.length > 0 ? (
          itemsFiltered.map((item, index) => (
            <ProductForList
              key={`${index}-${item.name}`}
              item={item}
              token={token.current}
            />
          ))
        ) : (
          <p>
            No results. There isn't any product with '{itemName}' as the name in
            the database.
          </p>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default FormProducts;
