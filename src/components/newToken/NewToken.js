// import { getToken, words } from '@the-collab-lab/shopping-list-utils';
// import { useNavigate } from 'react-router-dom';
// import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { listsCollection } from '../../lib/api';
import './NewToken.css';

const NewToken = () => {
  // const navigate = useNavigate();

  const token = () => {
    console.log('Creating new lists is disabled');
    // const getTokenStorage = getToken(words);
    // localStorage.setItem('token', getTokenStorage);

    // setDoc(doc(listsCollection, getTokenStorage), {
    //   createdAt: serverTimestamp(),
    // });

    // navigate('/add-items');
  };

  return (
    <button
      onClick={token}
      className="button-container button-newtoken"
      aria-label="Create a new list"
    >
      Create a new list
    </button>
  );
};

export default NewToken;
