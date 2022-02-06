import React, { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getListFromDB } from '../../lib/api';
import './ListProducts.css';
import { Redirection } from '../../components/Redirection';
import { Nav } from '../../components/Nav';
import ListEmpty from '../../components/ListEmpty/ListEmpty';
import FormProducts from '../../components/formProducts/FormProducts';
import Loading from '../../components/loading/loading';

const ListProducts = () => {
  const [itemsProducts, setItemsProducts] = useState([]);
  const token = useRef(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const unsubscribe = onSnapshot(getListFromDB(token.current), (doc) => {
        let { items } = doc.data();
        if (items === undefined) {
          setLoading(false);
          setItemsProducts([]);
        } else {
          setLoading(false);
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
      <h1>Smart Shopping List</h1>
      {loading ? (
        <Loading />
      ) : itemsProducts.length === 0 ? (
        <ListEmpty />
      ) : (
        <FormProducts items={itemsProducts} />
      )}
      <Nav />
    </main>
  );
};

export default ListProducts;
