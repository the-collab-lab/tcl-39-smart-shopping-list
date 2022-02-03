import React, { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getListFromDB } from '../../lib/api';
import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';
import ListEmpty from '../../components/ListEmpty/ListEmpty';
import FormProducts from '../../components/formProducts/FormProducts';

const ListProducts = () => {
  const [itemsProducts, setItemsProducts] = useState([]);
  const token = useRef(localStorage.getItem('token'));

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const unsubscribe = onSnapshot(getListFromDB(token.current), (doc) => {
        let { items } = doc.data();
        if (items === undefined) {
          setItemsProducts([]);
        } else {
          setItemsProducts(items);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  if (!token.current) return <Redirection />;

  return (
    <>
      <h1>Smart Shopping List</h1>
      {itemsProducts && itemsProducts.length === 0 ? (
        <ListEmpty />
      ) : (
        <FormProducts items={itemsProducts} />
      )}
      <Nav />
    </>
  );
};

export default ListProducts;
