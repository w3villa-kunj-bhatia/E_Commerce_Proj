import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice.js";
import ProductList from "../components/ProductList.jsx";

function Products() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1>Products</h1>

      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && <ProductList products={items} />}
    </div>
  );
}

export default Products;
