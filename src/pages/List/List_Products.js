import React, { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getListFromDB } from '../../lib/api';
import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';
import ListEmpty from '../ListEmpty/ListEmpty';
import FormProducts from '../formProducts/FormProducts';

const ListProducts = () => {
  const [itemsProducts, setItemsProducts] = useState([]);
  const list = useRef({});
  const token = useRef(localStorage.getItem('token'));

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const unsubscribe = onSnapshot(getListFromDB(token.current), (doc) => {
        let { items } = doc.data();
        if (items === undefined) {
          setItemsProducts([]);
        } else {
          list.current = doc.data();
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
    <main>
      {itemsProducts && itemsProducts.length === 0 ? (
        <ListEmpty />
      ) : (
        <FormProducts list={list} items={itemsProducts} />
      )}
      <Nav />
    </main>
  );
};

export default ListProducts;
