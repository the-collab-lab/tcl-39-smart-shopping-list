import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Redirection.css"

export const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  });

  return (
    <main>
      <h1 className='h1-redirected'> You're being redirected now! 🛫</h1>
    </main>
  );
};
