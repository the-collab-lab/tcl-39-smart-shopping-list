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
          <label htmlFor="filter">Search a product by name</label>
          <div className="filter-item">
            <input
              id="filter"
              className="filter-input"
              value={itemName}
              type="text"
              onChange={handleChange}
              placeholder="Product's name to search"
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
            itemsFiltered.map((item, index) => (
              <ProductForList
                key={`${index}-${item.name}`}
                item={item}
                token={token.current}
              />
            ))
          ) : (
            <div className="mssg_result_empty">
              <p>
                No results. There isn't any product with '{itemName}' as the
                name in the database.
              </p>
            </div>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default FormProducts;
