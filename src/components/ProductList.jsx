import { Link } from "react-router-dom";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="product-card"
        >
          <img
            src={product.image} 
            alt={product.title}
            className="product-image"
          />

          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;