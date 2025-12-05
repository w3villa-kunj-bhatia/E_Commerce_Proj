import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className={styles.productCard}
        >
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />

          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
