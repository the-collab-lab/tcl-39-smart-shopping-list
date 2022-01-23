import { useLocation } from 'react-router-dom';

export const ProductDetails = () => {
  const location = useLocation();
  const product = location.state.product;
  return <div>Product details for {product.name}</div>;
};
