import React, { useEffect, useRef, useState } from 'react';
import { Nav } from '../../components/Nav';
import { Redirection } from '../../components/Redirection';
import ListEmpty from '../../components/ListEmpty/ListEmpty';
import FormProducts from '../../components/formProducts/FormProducts';
import Loading from '../../components/loading/loading';
import { getItemsFromList } from '../../lib/api';
import { getTokenFromStorage } from '../../utils/utils';
import './ListProducts.css';

const ListProducts = () => {
  const [items, setItems] = useState([]);
  const token = useRef(getTokenFromStorage());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token.current) {
      /* Get items */
      const setInitialItems = async (token) => {
        setLoading(true);
        const products = await getItemsFromList(token);

        if (products) {
          setItems(products);
        }
        setLoading(false);
      };

      setInitialItems(token.current);
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
