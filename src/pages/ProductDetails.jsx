import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice.js";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

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

  return (
    <div>
      <h1>Product Details</h1>

      <div className="product-details">
        <img
          src={product.image}
          alt={product.title}
          className="product-details-image"
        />

        <div className="product-details-info">
          <h2>{product.title}</h2>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <Link to="/products">Back to products</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;