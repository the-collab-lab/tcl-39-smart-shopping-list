import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { listsCollection } from '../lib/api';

const NewToken = () => {
  const navigate = useNavigate();

  const token = () => {
    const getTokenStorage = getToken(words);
    localStorage.setItem('token', getTokenStorage);

    setDoc(doc(listsCollection, getTokenStorage), {
      createdAt: serverTimestamp(),
    });

    navigate('/add-items');
  };

  return <button onClick={token}>Create a new list</button>;
};

export default NewToken;
