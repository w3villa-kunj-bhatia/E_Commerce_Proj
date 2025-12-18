import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { signal }) => {
    // Pass the signal to the fetch call so it can be aborted
    const res = await fetch("https://fakestoreapi.com/products", { signal });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // IMPORTANT: Check for and ignore the AbortError from cancellation
        if (action.error.name === 'AbortError') {
          return;
        }
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;