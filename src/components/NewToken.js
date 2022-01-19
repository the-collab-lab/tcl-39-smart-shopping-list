import React, { useEffect, useState } from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const NewToken = () => {
  let navigate = useNavigate();

  function token(products) {
    const getTokenStorage = getToken(words);
    localStorage.setItem('token', JSON.stringify(getTokenStorage));

    setDoc(doc(db, 'Tokens', getTokenStorage), {});

    navigate('/list');
  }

  return (
    <>
      <button onClick={token}>Create a new list</button>
    </>
  );
};

export default NewToken;
