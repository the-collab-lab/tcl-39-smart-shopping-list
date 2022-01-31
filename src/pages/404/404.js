import { useNavigate } from 'react-router-dom';

export const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>404 Not Found Route</h1>
      <h3>Looks like you're lost!!! 😱</h3>
      <h4>Fear no more, we can help you 🏡</h4>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Click to go home
      </button>
    </>
  );
};
