import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const NewToken = () => {
  const navigate = useNavigate();

  const token = () => {
    const getTokenStorage = getToken(words);
    localStorage.setItem('token', getTokenStorage);

    setDoc(doc(db, 'lists', getTokenStorage), {});

    navigate('/add-items');
  };

  return <button onClick={token}>Create a new list</button>;
};

export default NewToken;
