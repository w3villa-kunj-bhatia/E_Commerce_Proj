import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import productsReducer from "../redux/productsSlice.js";
import ProductDetails from "./ProductDetails.jsx";

// Helper to render with real Redux store + router
function renderWithStoreAndRouter(ui, { preloadedState, route = "/products/1" } = {}) {
  const store = configureStore({
    reducer: { products: productsReducer },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/products/:id" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe("ProductDetails (with mocked API)", () => {
  // keep original fetch so we can restore later
  const originalFetch = global.fetch;

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test("loads product from API and renders its details", async () => {
    const fakeProducts = [
      {
        id: 1,
        title: "Test Product",
        price: 99.99,
        category: "Electronics",
        description: "Awesome test product",
        image: "http://example.com/product.jpg",
      },
    ];

    // Mock global.fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeProducts,
    });

    renderWithStoreAndRouter(<ProductDetails />);

    // Initially: loading state
    expect(
      screen.getByText(/loading product details/i)
    ).toBeInTheDocument();

    // Wait for the product to load and render
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /product details/i })
      ).toBeInTheDocument()
    );

    // Assert product details shown
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/awesome test product/i)).toBeInTheDocument();

    // Assert the image uses correct src/alt
    const img = screen.getByAltText("Test Product");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "http://example.com/product.jpg");

    // Assert API called correctly
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
      expect.any(Object) // { signal } from AbortController
    );
  });

  test("shows error message when API call fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    renderWithStoreAndRouter(<ProductDetails />);

    expect(
      screen.getByText(/loading product details/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText(/error: failed to fetch products/i)
      ).toBeInTheDocument()
    );
  });

  test("shows 'Product not found' when API succeeds but item is missing", async () => {
    const fakeProducts = [
      {
        id: 2,
        title: "Another Product",
        price: 10,
        category: "Misc",
        description: "Some desc",
        image: "http://example.com/another.jpg",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeProducts,
    });

    // Route id = 1, but API returns only product with id = 2
    renderWithStoreAndRouter(<ProductDetails />, {
      route: "/products/1",
    });

    await waitFor(() =>
      expect(
        screen.getByText(/product not found/i)
      ).toBeInTheDocument()
    );

    expect(
      screen.getByRole("link", { name: /back to products/i })
    ).toBeInTheDocument();
  });
});
