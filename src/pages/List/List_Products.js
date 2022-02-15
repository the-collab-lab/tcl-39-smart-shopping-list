import React, { useEffect, useRef, useState } from 'react';
import { Nav } from '../../components/Nav';
import { Redirection } from '../../components/Redirection';
import ListEmpty from '../../components/ListEmpty/ListEmpty';
import FormProducts from '../../components/formProducts/FormProducts';
import Loading from '../../components/loading/loading';
import { getItemsFromList } from '../../lib/api';
import { getTokenFromStorage } from '../../utils/utils';
import './ListProducts.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ListProducts = () => {
  const [items, setItems] = useState([]);
  const token = useRef(getTokenFromStorage());
  const [loading, setLoading] = useState(true);
  const listProducts = useRef();

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const setInitialItems = (token) => {
        // setLoading(true);
        onSnapshot(doc(db, 'lists', token.current), (doc) => {
          listProducts.current = doc.data().items;

          if (listProducts.current === undefined) {
            setItems([]);
            setLoading(false);
          } else {
            setItems(listProducts.current);
            setLoading(false);
          }
        });
      };

      setInitialItems(token);
    }
  }, []);

  if (!token.current) return <Redirection />;

  return (
    <main>
      <h1>Smart Shopping List</h1>
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <ListEmpty />
      ) : (
        <FormProducts items={items} />
      )}
      <Nav />
    </main>
  );
};

export default ListProducts;
