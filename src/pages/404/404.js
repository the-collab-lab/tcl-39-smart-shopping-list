import { useNavigate } from 'react-router-dom';
import "./404.css"

export const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <main className='main-404-container'>
      <h1 className='h1-container'>Oops!</h1>
      <h2 className='h2-container'>404 Not Found Route</h2>
      <p className='p-container'>Looks like you're lost!!! 😱</p>
      <p className='p-container'>Fear no more, we can help you 🏡</p>
      <button
        className='button-container'
        aria-label="go home"
        onClick={() => {
          navigate('/');
        }}
      >
        Click to go home
      </button>
    </main>
  );
};
