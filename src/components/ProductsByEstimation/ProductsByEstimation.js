import { useEffect, useState } from 'react';
import {
  getInactiveProducts,
  getProductsEstimated,
  getProductsEstimatedWithRange,
  sortProductsByName,
} from '../../utils/utils';
import { ProductForList } from '../productForList/ProductForList.js';
import './ProductsByEstimation.css';

export default function ProductsByEstimation({
  items = [],
  title = 'Soon',
  estimationType = 'soon',
  start = 0,
  end = 6,
}) {
  const token = localStorage.getItem('token');
  const [productsEstimated, setProductsEstimated] = useState(items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let resultProducts = [];
    if (estimationType !== 'inactive') {
      if (estimationType === 'not-soon') {
        resultProducts = getProductsEstimated(items, start);
      } else {
        resultProducts = getProductsEstimatedWithRange(items, start, end);
      }
    } else {
      resultProducts = getInactiveProducts(items);
    }

    const productsSorted = sortProductsByName(resultProducts);

    setProductsEstimated(productsSorted);
    setLoading(false);
  }, [items, estimationType, start, end]);

  return (
    <div className="products-by-section">
      <h2 className="section-title">{title}</h2>
      {loading ? <p>Loading...</p> : null}
      {productsEstimated.length > 0 ? (
        productsEstimated.map((product, index) => (
          <ProductForList
            key={`${index}-${product.name}`}
            estimationType={estimationType}
            item={product}
            token={token}
          />
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}
