import { Link } from 'react-router-dom';

export const ProductForList = ({ item, handleDeleteAttempt, handleCheck }) => {
  return (
    <div
      className="product-container"
      aria-label={`${
        item.howSoon === 7
          ? 'soon'
          : item.howSoon === 14
          ? 'kind of soon'
          : 'not soon'
      }`}
    >
      <input type="checkbox" onChange={handleCheck} />
      <p>
        Product: <span className="item-name">{item.name}</span>
      </p>
      <div className="btn-container">
        <Link to={`/list/${item.name}/`} state={{ product: item }}>
          <button>details</button>
        </Link>
        <button onClick={handleDeleteAttempt}>delete</button>
      </div>
    </div>
  );
};
