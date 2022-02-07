import { getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListFromDB } from '../../lib/api';
import { checkTokenFormat } from '../../utils/utils';
import './JoinList.css';

export const JoinList = () => {
  const [joinToken, setJoinToken] = useState('');
  const navigate = useNavigate();

  const checkIfTokenExists = async (token) => {
    const trimmedToken = token.trim();
    const isValidToken = checkTokenFormat(trimmedToken);

    if (!isValidToken) {
      alert('Un token debe tener 3 palabras. Por favor intente de nuevo.');
      return;
    }

    const docRef = getListFromDB(trimmedToken);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem('token', trimmedToken);
      navigate('/list');
    } else {
      alert('No existe este token!');
    }
  };

  const handleChange = (e) => setJoinToken(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfTokenExists(joinToken);
  };

  return (
    <>
      <h3>Join list</h3>
      <form onSubmit={handleSubmit}>
        <p>Join an existing shopping list by entering a three word token.</p>
        <label htmlFor="joinToken">Share token</label>
        <input
          id="joinToken"
          className="inputField"
          type="text"
          value={joinToken}
          required
          onChange={handleChange}
          placeholder="Enter your token"
        />
        <button type="submit">Join an existing list</button>
      </form>
    </>
  );
};
