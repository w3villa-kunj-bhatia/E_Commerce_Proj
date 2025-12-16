import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice.js";
import styles from "./ProductDetails.module.css";
import DOMPurify from "dompurify";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    // 1. Create the AbortController instance
    const controller = new AbortController();

    if (status === "idle") {
      // 2. Dispatch the thunk, passing the AbortSignal
      dispatch(fetchProducts(null, { signal: controller.signal }));
    }

    // 3. Cleanup function: runs on component unmount
    return () => {
      // Cancel the running request when component unmounts.
      controller.abort();
    };
  }, [dispatch]); // Keep dependencies minimal to prevent premature cancellation loops

  const product = items.find((p) => String(p.id) === String(id));

  if (status === "loading" || status === "idle") {
    return <p>Loading product details...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  // Ensures any HTML content is safe before rendering.
  const sanitizedDescription = DOMPurify.sanitize(product.description);

  return (
    <div>
      <h1>Product Details</h1>

      <div className={styles.productDetails}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productDetailsImage}
        />

        <div className={styles.productDetailsInfo}>
          <h2>{product.title}</h2>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Description:</strong>
            {/* [MODIFIED] Use dangerouslySetInnerHTML with the sanitized content */}
            <span dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </p>
          <Link to="/products">Back to products</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
