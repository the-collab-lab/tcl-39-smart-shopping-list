import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';

const NewToken = () => {
  let navigate = useNavigate();
  function token() {
    navigate('/list');
    localStorage.setItem('token', JSON.stringify(getToken(words)));
    const getStorage = JSON.parse(localStorage.getItem('token'));
  }
  return (
    <>
      <button onClick={token}>Create a new list</button>
    </>
  );
};

export default NewToken;
