import { getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getListFromDB } from '../lib/api';

export const JoinList = () => {
  const [joinToken, setJoinToken] = useState('');
  const navigate = useNavigate();

  const checkIfTokenExist = async (token) => {
    const docRef = getListFromDB(token);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem('token', joinToken);
      navigate('/list');
      console.log('Document data:', docSnap.data());
    } else {
      alert('No existe este token!');
    }
  };

  const handleChange = (e) => {
    setJoinToken(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfTokenExist(joinToken);
  };

  return (
    <>
      <h3>Join list</h3>
      <form onSubmit={handleSubmit}>
        <p>Join an existing shopping list by entering a three word token.</p>
        <label htmlFor="joinToken">Share token</label>
        <br />
        <input
          id="joinToken"
          type="text"
          value={joinToken}
          onChange={handleChange}
          placeholder="Enter your token"
        ></input>
        <br />
        <button type="submit">Join an existing list</button>
      </form>
    </>
  );
};
