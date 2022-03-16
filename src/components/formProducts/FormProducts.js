import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './FormProducts.css';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProductsByEstimation from '../ProductsByEstimation/ProductsByEstimation';

const FormProducts = ({ items }) => {
  const [itemName, setItemName] = useState('');
  const handleChange = (e) => {
    setItemName(e.target.value);
    setIsFiltering(true);

    if (e.target.value === '') {
      setIsFiltering(false);
    }
  };

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
          <label htmlFor="filter">Filter your shopping list:</label>
          <div className="filter-item">
            <input
              id="filter"
              className="filter-input"
              value={itemName}
              type="text"
              onChange={handleChange}
              placeholder="Search a product by name"
            />
            {isFiltering ? (
              <HighlightOffIcon onClick={resetInput} />
            ) : (
              <SearchIcon />
            )}
          </div>
        </form>
      </div>
      <div className="parent_list_view">
        <div className="table_view">
          <table className="table-container">
            <thead>
              <tr>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="circle soon"></span>
                </td>
                <td>
                  <span>Soon</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="circle kindOfSoon"></span>
                </td>
                <td>
                  <span>Kind of Soon</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="circle notSoon"></span>
                </td>
                <td>
                  <span>Not Soon</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="productos_view products-container">
          {itemsFiltered?.length > 0 ? (
            <>
              <ProductsByEstimation
                items={itemsFiltered}
                start={0}
                end={6}
                title="Soon"
                estimationType="soon"
              />
              <ProductsByEstimation
                items={itemsFiltered}
                start={8}
                end={15}
                title="Kind of Soon"
                estimationType="kind-of-soon"
              />
              <ProductsByEstimation
                items={itemsFiltered}
                start={16}
                end={31}
                title="Not Soon"
                estimationType="not-soon"
              />
              <ProductsByEstimation
                items={itemsFiltered}
                title="Inactive"
                estimationType="inactive"
              />
            </>
          ) : (
            <p className="no-results-text">
              No results. There isn't a{' '}
              <span className="no-results-name">'{itemName}'</span> product in
              the database.
            </p>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default FormProducts;
