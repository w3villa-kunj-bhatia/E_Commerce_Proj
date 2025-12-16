import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice.js";
import ProductList from "../components/ProductList.jsx";

function Products() {
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
      // Cancel the running request when component unmounts
      controller.abort();
    };
  }, [dispatch]); // Keep dependencies minimal to prevent premature cancellation loops

  // --- CLS Fix (Original comment) ---
  // [MODIFIED] Removed the ProductList call in the loading state,
  // as it caused the unwanted "No products found." message to appear.
  if (status === "loading" || status === "idle") {
    return (
      <div>
        <h1>Products</h1>
        <p>Loading products...</p>
        {/* Removed: <ProductList products={[]} /> */}
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>

      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && <ProductList products={items} />}
    </div>
  );
}

export default Products;
