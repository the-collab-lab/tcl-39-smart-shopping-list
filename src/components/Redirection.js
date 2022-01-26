import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  });

  return <h1>You're being redirected now! 🛫</h1>;
};
