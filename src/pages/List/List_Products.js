import React, { useEffect, useRef, useState } from 'react';
import { Nav } from '../../components/nav/Nav';
import { Redirection } from '../../components/redirection/Redirection';
import ListEmpty from '../../components/ListEmpty/ListEmpty';
import FormProducts from '../../components/formProducts/FormProducts';
import Loading from '../../components/loading/loading';
import { getTokenFromStorage } from '../../utils/utils';
import './ListProducts.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';

const ListProducts = () => {
  const [items, setItems] = useState([]);
  const token = useRef(getTokenFromStorage());
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let unsub = null;
    if (token.current) {
      /* Get items */
      const setInitialItems = (token) => {
        unsub = onSnapshot(doc(db, 'lists', token.current), (doc) => {
          const data = doc.data();
          if (data === undefined) {
            setItems([]);
            localStorage.removeItem('token');
            navigate('/');
          } else {
            let { items } = doc.data();
            setItems(items);
          }
          setLoading(false);
        });
      };

      setInitialItems(token);
    }
    return () => {
      // Stop listening to changes when no longer in use
      if (unsub) {
        unsub();
      }
    };
  }, [navigate]);
  if (!token.current) return <Redirection />;

  return (
    <>
      <main>
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <ListEmpty />
        ) : (
          <FormProducts items={items} />
        )}
      </main>
      <Nav />
    </>
  );
};

export default ListProducts;
