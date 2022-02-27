import { useNavigate } from 'react-router-dom';
import "./404.css"

export const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1 className='h1-container'>Oops!</h1>
      <h2>404 Not Found Route</h2>
      <p>Looks like you're lost!!! 😱</p>
      <p>Fear no more, we can help you 🏡</p>
      <button
        className='button-container'
        onClick={() => {
          navigate('/');
        }}
      >
        Click to go home
      </button>
    </main>
  );
};
