import React from 'react';
import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {
  let navigate = useNavigate();
  function token() {
    navigate('/list');
    localStorage.setItem('token', JSON.stringify(getToken(words)));
    const getStorage = JSON.parse(localStorage.getItem('token'));
  }
  return (
    <>
      <h1>Shopping List!</h1>
      <button onClick={token}>Create a new list</button>
    </>
  );
};

export default CreateList;
